import "app/config"

import waterfall from "helper/array/waterfall"

import {connect, disconnect} from "app/db/connection"
import {start, stop} from "app/server"

const exit = (code: number = 0) => waterfall([
  () => disconnect(),
  () => stop()
])
  .then(() => { process.exit(code) })
  .catch((error: Error) => {
    console.error(error)

    process.exit(1)
  });

["SIGTERM", "SIGINT"].forEach(signal => process.on(signal, () => exit()))

waterfall([
  () => connect({logging: process.env.NODE_ENV !== "production"}),
  () => start()
]).catch(error => {
  console.error(error)

  return exit(1)
})
