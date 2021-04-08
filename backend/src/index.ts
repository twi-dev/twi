import "config"

import waterfall from "helper/array/waterfall"

import {connect, disconnect} from "./db"
import {start, stop} from "./server"

const exit = (code: number = 0) => waterfall([disconnect, stop])
  .then(() => { process.exitCode = code })
  .catch((error: Error) => {
    console.error(error)

    process.exit(1)
  })

;["SIGTERM", "SIGINT"].forEach(signal => process.on(signal, () => exit()))

waterfall([connect, start]).catch(error => {
  console.error(error)

  return exit(1)
})
