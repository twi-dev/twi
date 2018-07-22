import {createServer} from "http"
import {join} from "path"

import Koa from "koa"

import config from "core/config"
import createRouter from "core/base/router"
import readMiddlewares from "core/base/middleware"

import log from "core/log"

let server = null

const {port, host} = config.server

const onServerError = err => process.emit("error", err)

const onServerStarted = () => log.ok("Server have been started")

const router = createRouter(join(__dirname, "..", "..", "route"))

const middlewares = readMiddlewares()

/**
 * Initializes HTTP server and returns its instance for the further usage.
 *
 * @return {http.Server}
 */
async function startServer() {
  const koa = new Koa()

  Array.of(...middlewares, router.allowedMethods(), router.routes())
    .forEach(middleware => koa.use(middleware))

  server = createServer(koa.callback())

  server
    .on("error", onServerError)
    .listen({port, host}, onServerStarted)

  return server
}

/**
 * Closes HTTPS server.
 */
const stopServer = () => server.close()

export {startServer, stopServer}
