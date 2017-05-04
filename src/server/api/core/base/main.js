import {join} from "path"

import favicon from "koa-favicon"
import body from "koa-bodyparser"
import cors from "kcors"

import Server from "system/base/Server"
import makeRouter from "system/base/router"
import getConfig from "system/base/getConfig"

import errorHandler from "api/core/middleware/error-handler"
import logger from "api/core/middleware/logger"
import multipart from "api/core/middleware/multipart"

const ROOT = process.cwd()

const FAVICON_PATH = join(ROOT, "static/assets/img/icns/favicon/twi.ico")

const r = makeRouter(join(ROOT, "server/api/route"))()

async function main(options) {
  const config = await getConfig(options.name, options.env)

  const server = new Server({...config, ...options})

  const middlewares = [
    errorHandler(), // Handle all errors from Koa context
    logger(), // Simplest logger
    cors(), // TODO: Configure allowed Origins
    body(),
    multipart({ignorePaths: ["/graphql"]}), // Hanlde multipart/form-data
    favicon(FAVICON_PATH), // Server application favicon
    r.allowedMethods(),
    r.routes()
  ]

  server.use(middlewares)

  await server.listen()

  console.log(`The ${server.name} has been started.`)
  console.log("Listening on http://localhost:1337")
}

export default main
