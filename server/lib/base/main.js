import waterfall from "lib/helper/array/runWaterfall"
import log from "lib/log"

import db from "lib/base/database"
import server from "lib/base/server"

function onError(err) {
  log.error(err)

  process.exit(1)
}

const stop = () => waterfall([
  server.close,
  db.disconnect,
  process.exit
]).catch(onError)

function beforeExit() {
  if (process.exitCode == null) {
    process.exitCode = 0
  }

  log.normal("Good bye.")
}

["SIGINT", "SIGTERM"].forEach(signal => process.on(signal, stop))

process.on("beforeExit", beforeExit)

// Run Twi's HTTP server
waterfall([db.connect, server.start]).catch(onError)
