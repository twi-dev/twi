import {ApolloServerLoaderPlugin} from "type-graphql-dataloader"
import {ApolloServer} from "apollo-server-koa"
import {getConnection} from "typeorm"

import Router from "@koa/router"

import schema from "api/schema"

const server = new ApolloServer({
  schema,
  uploads: false,
  plugins: [
    ApolloServerLoaderPlugin({
      typeormGetConnection: getConnection
    })
  ],

  context: ({ctx}) => ctx
})

const path = "/graphql"

const router = new Router()

const middleware = server.getMiddleware({cors: false, path})

router
  .get("/", middleware as any)
  .post("/", middleware as any)

export default router
