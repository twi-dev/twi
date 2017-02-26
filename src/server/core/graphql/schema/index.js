import {
  GraphQLSchema
} from "graphql"

import proxy from "server/core/helper/decorator/proxy"
import apply from "server/core/helper/proxy/selfInvokingClass"

import Query from "./QueryType"

@proxy({apply})
class Schema {
  constructor() {
    this.__query = null
    this.__mutation = null
    this.__subscription = null
  }

  setQuery(query) {
    this.__query = query

    return this
  }

  query(name, description) {
    const query = new Query(name, description, this)

    return query
  }

  end() {
    return new GraphQLSchema({
      query: this.__query,
      mutation: this.__mutation,
      subscription: this.__subscription
    })
  }
}

export default Schema
