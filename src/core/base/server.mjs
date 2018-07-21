import {createServer} from "http"
import {join} from "path"

import Koa from "koa"

import config from "core/config"
import createRouter from "core/base/router"

let server = null

const {port, host} = config.server

const onServerError = err => process.emit("error", err)

const onServerClosed = () => console.log("server has been closed")

const onServerStarted = () => console.log("Server have been started")

const router = createRouter(join(__dirname, "..", "..", "route"))

/**
 * Initializes HTTP server and returns its instance to further usage
 *
 * @return {http.Server}
 */
async function startServer() {
  const koa = new Koa();

  [router.allowedMethods(), router.routes()]
    .forEach(middleware => koa.use(middleware))

  server = createServer(koa.callback())

  server
    .on("error", onServerError)
    .listen({port, host}, onServerStarted)

  process.on("SIGINT", () => server.close(onServerClosed))

  return server
}

const stopServer = () => server.close()

export default startServer

export {startServer, stopServer}
