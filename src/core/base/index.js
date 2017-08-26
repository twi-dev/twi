import {join} from "path"

import {SubscriptionServer} from "subscriptions-transport-ws"
import {execute, subscribe} from "graphql"

import serveStatic from "koa-static"
import passport from "koa-passport"
import favicon from "koa-favicon"
import body from "koa-bodyparser"

import Server from "core/base/Server"
import makeRouter from "core/base/router"
import log from "core/log"


// import cors from "core/middleware/cors"
// import logger from "core/middleware/logger"
// import client from "core/middleware/client"
// import multipart from "core/middleware/multipart"
// import errorHandler from "core/middleware/000-error-handler"
// import xPoweredBy from "core/middleware/001-x-powered-by"

import createMailService from "core/mail"
import createConnection from "core/base/database"

import login from "core/auth/login"

import collectMiddlewares from "./middleware"
import schema from "./graphql"

const ROOT = process.cwd()

const router = makeRouter(join(ROOT, "route"))()

async function main(config) {
  const server = new Server(config)

  const mail = createMailService(config)

  passport.use(login)

  const middlewares = [
    ...(await collectMiddlewares(config)),
    passport.initialize(),
    router.allowedMethods(),
    router.routes()
  ]

  server
    .ext({mail})
    .use(middlewares)

  await createConnection(config.database)

  const httpServer = await server.listen()

  // Experimental!
  SubscriptionServer.create({execute, schema, subscribe}, {
    server: httpServer,
    path: "/graphql"
  })

  log.ok(`The ${server.name} has been started.`)
  log.ok(`Listening on ${server.addr} address.`)
  log.ok("GraphQL endpoint mounted at %s/graphql", server.addr)
}

export default main
