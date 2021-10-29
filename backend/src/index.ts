import "app/config"

import waterfall from "helper/array/waterfall"

import startServer from "app/server"

import {createConnection} from "app/db/connection"

(async () => {
  const closeConnection = await createConnection({
    logging: process.env.NODE_ENV !== "production"
  })

  const stopServer = await startServer();

  ["SIGTERM", "SIGINT"].forEach(signal => process.on(signal, () => {
    waterfall([closeConnection, stopServer])
      .then(() => process.exit(0))
      .catch((error: Error) => {
        console.error(error)

        process.exit(1)
      })
  }))
})()
