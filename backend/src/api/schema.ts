import {resolve} from "path"

import {GraphQLSchema} from "graphql"
import {buildSchemaSync} from "type-graphql"

const schema: GraphQLSchema = buildSchemaSync({
  resolvers: [resolve("src", "api", "resolver", "*.ts")]
})

export default schema
