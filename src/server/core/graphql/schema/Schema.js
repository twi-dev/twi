import {
  GraphQLSchema
} from "graphql"

import proxy from "server/core/helper/decorator/proxy"
import apply from "server/core/helper/proxy/selfInvokingClass"

import Base from "./Base"
import Query from "./Query"

@proxy({apply})
class Schema extends Base {
  constructor() {
    super()

    this.__query = null
    this.__mutation = null
    this.__subscription = null
  }

  /**
   * Define query
   */
  query(name, description) {
    const setQuery = query => {
      this.__query = query

      return this
    }

    const query = new Query(name, description, setQuery)

    return query
  }

  /**
   * Generate schema
   */
  end() {
    return new GraphQLSchema({
      query: this.__query,
      mutation: this.__mutation,
      subscription: this.__subscription
    })
  }
}

export default Schema
