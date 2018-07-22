import series from "core/helper/promise/runSeries"

import {createConnection, closeConnection} from "core/base/database"
import {startServer, stopServer} from "core/base/server"
import log from "core/log"

function onError(err) {
  process.exitCode = 1

  log.error(err)
}

const exit = () => series([stopServer, closeConnection]).catch(onError)

function beforeExit() {
  if (process.exitCode == null) {
    process.exitCode = 0
  }

  log.normal("Good bye.")
}

["SIGINT", "SIGTERM"].forEach(signal => process.on(signal, exit))

process.on("exit", beforeExit)

// Run Twi's HTTP server
series([createConnection, startServer]).catch(onError)
