import {createServer} from "http"

import Koa from "koa"

import config from "core/config"

const {port, host} = config.server

const onServerError = err => process.emit("error", err)

const onServerClosed = () => console.log("server has been closed")

const onServerStarted = () => console.log("Server have been started")

/**
 * Initializes HTTP server and returns its instance to further usage
 *
 * @return {http.Server}
 */
async function initServer() {
  const koa = new Koa()

  const server = createServer(koa.callback())

  server
    .on("error", onServerError)
    .listen({port, host}, onServerStarted)

  process.on("SIGINT", () => server.close(onServerClosed))

  return server
}

export default initServer
