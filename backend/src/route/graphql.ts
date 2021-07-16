import {ApolloServerLoaderPlugin} from "type-graphql-dataloader"
import {ApolloServer} from "apollo-server-koa"
import {getConnection} from "typeorm"
import {nanoid} from "nanoid/async"
// import {Container} from "typedi"

import Router from "@koa/router"

import schema from "api/schema"

import {ContextWithContainer} from "app/context/WithContainer"

const server = new ApolloServer({
  schema,
  uploads: false,
  plugins: [
    // {
    //   requestDidStart: ({context}) => ({
    //     willSendResponse() {
    //       // TODO: Figure out correct typings for apollo server plugins
    //       const {requestId} = context as WithContainer

    //       Container.reset(requestId)
    //     }
    //   })
    // },

    ApolloServerLoaderPlugin({
      typeormGetConnection: getConnection
    })
  ],

  async context({ctx}: {ctx: ContextWithContainer}) {
    const requestId = await nanoid()
    // const container = Container.of(await nanoid())

    // container.set("context", ctx)

    // ctx.container = container
    ctx.requestId = requestId

    return ctx
  }
})

const path = "/graphql"

const router = new Router()

const middleware = server.getMiddleware({cors: false, path})

router
  .get("/", middleware as any)
  .post("/", middleware as any)

export default router
