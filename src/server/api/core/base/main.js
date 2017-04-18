import {join} from "path"

import favicon from "koa-favicon"
import body from "koa-bodyparser"

import {backend} from "system/helper/util/configure"

import Server from "system/base/Server"
import makeRouter from "system/base/router"

import errorHandler from "api/core/middleware/error-handler"
import logger from "api/core/middleware/logger"
import multipart from "api/core/middleware/multipart"

const ROOT = process.cwd()

const FAVICON_PATH = join(ROOT, "static/assets/img/icns/favicon/twi.ico")

const r = makeRouter(join(ROOT, "server/api/route"))()

const port = backend.port

async function main(dev, env) {
  const server = new Server("api", {dev, env, port})

  const middlewares = [
    errorHandler(), // Handle all errors from Koa context
    favicon(FAVICON_PATH), // Server application favicon
    logger(), // Simplest logger
    body(),
    multipart({ignorePaths: ["/graphql"]}), // Hanlde multipart/form-data
    r.allowedMethods(),
    r.routes()
  ]

  server.use(middlewares)

  await server.listen()

  console.log(`The ${server.name} has been started.`)
  console.log("Listening on http://localhost:1337")
}

export default main
