import createConnection from "core/base/database"
import initServer from "core/base/server"
import series from "core/helper/promise/runSeries"

function onError(err) {
  process.exitCode = 1

  console.error(err)
}

function onExit() {
  if (process.exitCode == null) {
    process.exitCode = 0
  }

  console.log("Good bye.")
}

process.on("exit", onExit)

series([createConnection, initServer])
  .catch(onError)
