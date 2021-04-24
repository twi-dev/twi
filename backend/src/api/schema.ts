import {Container} from "typeorm-typedi-extensions"
import {buildSchemaSync} from "type-graphql"
import {GraphQLSchema} from "graphql"

import authChecker from "auth/checker"

const schema: GraphQLSchema = buildSchemaSync({
  resolvers: [process.env.GRAPHQL_RESOLVERS!],
  container: Container,
  authChecker
})

export default schema
