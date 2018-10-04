import {createServer} from "http"
import {join} from "path"

import Koa from "koa"
import passport from "koa-passport"

import config from "core/config"
import createRouter from "core/base/router"
import readMiddlewares from "core/base/middleware"

import log from "core/log"

const {port, host} = config.server

const router = createRouter(join(__dirname, "..", "..", "route"))

const middlewares = Array.from([
  ...readMiddlewares(),

  passport.initialize(),
  router.allowedMethods(),
  router.routes()
])

const koa = new Koa()

middlewares.forEach(middleware => koa.use(middleware))

const server = createServer(koa.callback())

/**
 * Initializes HTTP server and returns its instance for the further usage.
 *
 * @return {void}
 */
const start = () => new Promise((resolve, reject) => {
  function onStarted() {
    log.ok("Server have been started")
    resolve()
  }

  server.on("error", reject).listen({port, host}, onStarted)
})

/**
 * Closes HTTPS server.
 */
const close = () => new Promise((resolve, reject) => {
  function onClosed(error) {
    if (error) {
      return reject(error)
    }

    log.ok("Server has been closed")
    resolve()
  }

  server.close(onClosed)
})

export default {start, close}
