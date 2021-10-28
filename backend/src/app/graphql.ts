import {
  ApolloServerPluginLandingPageGraphQLPlayground,
  ApolloServerPluginLandingPageDisabled
} from "apollo-server-core"
import {ApolloServer} from "apollo-server-koa"

import schema from "api/schema"

const graphql = new ApolloServer({
  schema,

  context: ({ctx}) => ctx,

  plugins: [
    process.env.NODE_ENV === "production"
      ? ApolloServerPluginLandingPageGraphQLPlayground()
      : ApolloServerPluginLandingPageDisabled()
  ]
})

export default graphql
