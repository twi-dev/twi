import {resolve} from "path"

import {GraphQLSchema} from "graphql"
import {buildSchemaSync} from "type-graphql"
import {Container} from "typeorm-typedi-extensions"

import authChecker from "auth/checker"

const schema: GraphQLSchema = buildSchemaSync({
  resolvers: [resolve(process.env.SERVER_ROOT, "api", "resolver", "*.ts")],
  container: Container,
  authChecker
})

export default schema
