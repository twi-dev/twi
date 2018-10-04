import {createServer} from "http"
import {join} from "path"

import Koa from "koa"
import passport from "koa-passport"

import config from "core/config"
import createRouter from "core/base/router"
import readMiddlewares from "core/base/middleware"

import log from "core/log"

const {port} = config.server

const router = createRouter(join(__dirname, "..", "..", "route"))

// Configure middlewares
const middlewares = Array.from([
  ...readMiddlewares(),

  passport.initialize(),
  router.allowedMethods(),
  router.routes()
])

const koa = new Koa()

// Assign middlewares to Koa.js instance
middlewares.forEach(middleware => koa.use(middleware))

// create HTTP server instance and Koa.js assign listener
const server = createServer(koa.callback())

/**
 * Start HTTP server to listen to configured port on localhost.
 *
 * @return {void}
 */
const start = () => new Promise((resolve, reject) => {
  function onStarted() {
    log.ok("Server have been started")
    resolve()
  }

  server.on("error", reject).listen(port, onStarted)
})

/**
 * Closes HTTPS server.
 *
 * @return {void}
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
