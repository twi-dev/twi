import series from "core/helper/promise/runSeries"
import log from "core/log"

import db from "core/base/database"
import server from "core/base/server"

function onError(err) {
  log.error(err)

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

const exit = () => series([server.close, db.disconnect]).catch(onError)

function beforeExit() {
  if (process.exitCode == null) {
    process.exitCode = 0
  }

  log.normal("Good bye.")
}

["SIGINT", "SIGTERM"].forEach(signal => process.on(signal, exit))

process.on("exit", beforeExit)

// Run Twi's HTTP server
series([db.connect, server.start]).catch(onError)
