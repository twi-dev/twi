import serial from "core/helper/array/runSerial"
import log from "core/log"

import db from "core/base/database"
import server from "core/base/server"

function onError(err) {
  log.error(err)

  // Force exiting app when error is some sort of following:
  if (
    (err instanceof Error && err.constructor.name === "Error")
    || err instanceof RangeError
    || err instanceof ReferenceError
    || err instanceof TypeError
  ) {
    return process.exit(1)
  }

  process.exitCode = 1
}

const exit = () => serial([server.close, db.disconnect]).catch(onError)

function beforeExit() {
  if (process.exitCode == null) {
    process.exitCode = 0
  }

  log.normal("Good bye.")
}

["SIGINT", "SIGTERM"].forEach(signal => process.on(signal, exit))

process.on("exit", beforeExit)

// Run Twi's HTTP server
serial([db.connect, server.start]).catch(onError)
