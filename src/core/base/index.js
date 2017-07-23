import {join} from "path"

import favicon from "koa-favicon"
import body from "koa-bodyparser"
import cors from "kcors"

import Server from "core/base/Server"
import makeRouter from "core/base/router"
import getConfig from "core/base/getConfig"
import log from "core/log"

import errorHandler from "core/middleware/error-handler"
import logger from "core/middleware/logger"
import multipart from "core/middleware/multipart"

import createMailService from "server/mail"
import createConnection from "server/base/database"

const ROOT = process.cwd()

const FAVICON_PATH = join(ROOT, "static/assets/img/icns/favicon/twi.ico")

const r = makeRouter(join(ROOT, "route"))()

async function main(options) {
  const config = await getConfig(options.name, options.env)

  const server = new Server({...config, ...options})

  const mail = createMailService({
    mail: config.mail,
    system: config.system
  })

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

  server
    .ext({mail})
    .use(middlewares)

  await createConnection(config.database)
  await server.listen()

  log.ok(`The ${server.name} has been started.`)
  log.ok(`Listening on ${server.addr} address.`)
}

export default main
