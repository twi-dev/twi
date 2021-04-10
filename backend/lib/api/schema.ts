import {resolve} from "path"

import {GraphQLSchema} from "graphql"
import {buildSchemaSync} from "type-graphql"

const schema: GraphQLSchema = buildSchemaSync({
  resolvers: [resolve("lib", "api", "resolver", "*.ts")]
})

export default schema
