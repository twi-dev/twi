import {join} from "path"

import serveStatic from "koa-static"
// import passport from "koa-passport"
import favicon from "koa-favicon"
import body from "koa-bodyparser"

import Server from "core/base/Server"
import makeRouter from "core/base/router"
import log from "core/log"

import cors from "core/middleware/cors"
import logger from "core/middleware/logger"
import multipart from "core/middleware/multipart"
import errorHandler from "core/middleware/error-handler"
import xPoweredBy from "core/middleware/x-powered-by"

import createMailService from "core/mail"
import createConnection from "core/base/database"

const ROOT = process.cwd()

const FAVICON_PATH = join(ROOT, "static/assets/img/icns/favicon/twi.ico")

const r = makeRouter(join(ROOT, "route"))()

async function main(config) {
  const server = new Server(config)

  const mail = createMailService(config)

  const middlewares = [
    [errorHandler],
    [xPoweredBy],
    [logger],
    [
      cors,
      {
        allowMethods: [
          "GET", "POST"
        ]
      }
    ],
    [body],
    [
      multipart,
      {
        ignorePaths: ["/graphql"]
      }
    ],
    [favicon, FAVICON_PATH],
    [serveStatic, join(ROOT, "static")],
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
  log.ok("GraphQL endpoint mounted at %s/graphql", server.addr)
}

export default main
