import {GraphQLSchema} from "graphql"

import proxy from "server/core/helper/decorator/proxy"
import apply from "server/core/helper/proxy/selfInvokingClass"

import Query from "./query"

@proxy({apply})
class Schema {
  constructor() {
    this._query = {}
    this._mutation = {}
    this._subscribtion = {}
  }

  query(name, description) {
    const query = new Query(name, description)

    return query
  }

  // mutation(name, description) {}

  // subscribtion(name) {}

  end() {
    return new GraphQLSchema({
      query: this._query,
      mutation: this._mutation,
      subscribtion: this._subscribtion
    })
  }
}

export default Schema
