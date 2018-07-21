import series from "core/helper/promise/runSeries"

import {createConnection} from "core/base/database"
import {startServer} from "core/base/server"

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

series([createConnection, startServer])
  .catch(onError)
