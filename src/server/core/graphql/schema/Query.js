import {
  GraphQLObjectType,
  GraphQLList,
  GraphQLNonNull
} from "graphql"

import proxy from "server/core/helper/decorator/proxy"
import apply from "server/core/helper/proxy/selfInvokingClass"

import Base from "./Base"
import Resolver from "./Resolver"

const isArray = Array.isArray

@proxy({apply})
class Query extends Base {
  constructor(name, description, cb = null) {
    super(cb)

    this.__name = name || "Query"
    this.__description = description
    this.__fields = {}
  }

  /**
   * @param string name – field name
   * @param function resolve – field resolver
   * @param Function type – resolver returning type
   */
  field = (name, type, required = false) => {
    if (isArray(type)) {
      type = new GraphQLList(type[0])
    }

    if (required) {
      type = new GraphQLNonNull(type)
    }

    const setResolver = resolver => {
      this.__fields[name] = {
        type,
        ...resolver
      }

      return this
    }

    const resolver = new Resolver(setResolver)

    return resolver
  }

  end() {
    const query = new GraphQLObjectType({
      name: this.__name,
      fields: this.__fields
    })

    return super.end(query)
  }
}

export default Query
