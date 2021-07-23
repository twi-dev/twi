import {buildSchemaSync} from "type-graphql"
import {GraphQLSchema} from "graphql"
import {Container} from "typedi"

import authChecker from "auth/checker"

const schema: GraphQLSchema = buildSchemaSync({
  container: Container,
  resolvers: [process.env.GRAPHQL_RESOLVERS!],
  authChecker
})

export default schema
