import {Server} from "http"

import {
  ApolloServerPluginLandingPageGraphQLPlayground,
  ApolloServerPluginLandingPageDisabled,
  ApolloServerPluginDrainHttpServer
} from "apollo-server-core"
import {ApolloServer} from "apollo-server-koa"

import schema from "api/schema"

function createApolloServer(httpServer: Server): ApolloServer {
  const apolloServer = new ApolloServer({
    schema,

    context: ({ctx}) => ctx,

    stopOnTerminationSignals: false,
    plugins: [
      ApolloServerPluginDrainHttpServer({httpServer}),
      process.env.NODE_ENV === "production"
        ? ApolloServerPluginLandingPageDisabled()
        : ApolloServerPluginLandingPageGraphQLPlayground()
    ]
  })

  return apolloServer
}

export default createApolloServer
