import {Container} from "typeorm-typedi-extensions"
import {buildSchemaSync} from "type-graphql"
import {GraphQLSchema} from "graphql"

import authChecker from "auth/checker"

// import {WithContainer} from "app/context/WithContainer"

const schema: GraphQLSchema = buildSchemaSync({
  // container: ({context}: ResolverData<WithContainer>) => context.container,

  container: Container,
  resolvers: [process.env.GRAPHQL_RESOLVERS!],
  authChecker
})

export default schema
