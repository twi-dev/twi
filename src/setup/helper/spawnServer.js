// DEPRECATED

import {spawn} from "child_process"

const ora = require("ora")()

const spawnServer = stackTrace => new Promise((resolve, reject) => {
  function onStdout(message) {
    ora.stop()
    console.log(message)
    ora.text = "Waiting..."
    ora.start()
  }

  function onStderr(message) {
    ora.text = String(message)
    ora.fail()
  }

  function onClose(code) {
    if (code === 0) {
      ora.stop()
      resolve()
    } else {
      reject(new ReferenceError("Process has exited with non-zero code."))
    }
  }

  const args = []

  if (stackTrace) {
    args.push("--stack-trace")
  }

  const proc = spawn("node", args)
    .on("close", onClose)
    .on("error", reject)

  proc.stdout.on("data", onStdout)
  proc.stderr.on("data", onStderr)
})

export default spawnServer
