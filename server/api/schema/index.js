import {GraphQLSchema as Schema} from "graphql"

import Query from "server/api/schema/query"
import Mutation from "server/api/schema/mutation"

const schema = new Schema({
  query: Query,
  mutation: Mutation
})

export default schema
