import {ApolloServer} from "apollo-server-koa"

import Router from "@koa/router"

import schema from "api/schema"

const server = new ApolloServer({
  schema,
  uploads: false,

  context: ({ctx}) => ctx
})

const path = "/graphql"

const router = new Router()

const middleware = server.getMiddleware({cors: false, path})

router
  .get("/", middleware)
  .post("/", middleware)

export default router
