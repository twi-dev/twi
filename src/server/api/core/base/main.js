import {join} from "path"

import favicon from "koa-favicon"
import body from "koa-bodyparser"
import cors from "kcors"

import Server from "system/base/Server"
import makeRouter from "system/base/router"
import getConfig from "system/base/getConfig"

import errorHandler from "server/api/core/middleware/error-handler"
import logger from "server/api/core/middleware/logger"
import multipart from "server/api/core/middleware/multipart"

import createMailerService from "server/api/core/mail"

const ROOT = process.cwd()

const FAVICON_PATH = join(ROOT, "static/assets/img/icns/favicon/twi.ico")

const r = makeRouter(join(ROOT, "server/api/route"))()

async function main(options) {
  const config = await getConfig(options.name, options.env)

  const server = new Server({...config, ...options})

  const mail = createMailerService({
    mail: config.mail,
    system: config.system
  })

  server.ext({mail}) // I don't think is that a good idea :D

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
