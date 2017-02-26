import {
  GraphQLObjectType,
  GraphQLList,
  GraphQLNonNull
} from "graphql"

import proxy from "server/core/helper/decorator/proxy"
import apply from "server/core/helper/proxy/selfInvokingClass"

const isArray = Array.isArray

@proxy({apply})
class Query {
  constructor(name, description, parent = null) {
    this.__name = name || "Query"
    this.__description = description
    this.__fields = {}
    this.__parent = parent
  }

  /**
   * @param string name – field name
   * @param function resolve – field resolver
   * @param Function type – resolver returning type
   */
  field = (name, type, notNull = false) => {
    if (isArray(type)) {
      type = new GraphQLList(type[0])
    }

    if (notNull) {
      type = new GraphQLNonNull(type)
    }

    const resolve = (fn, args) => {
      this.__fields[name] = {
        type,
        args,
        resolve: fn
      }

      return this
    }

    const end = () => {
      this.__fields[name] = {type}

      return this
    }

    return {
      resolve,
      end
    }
  }

  end = () => {
    const query = new GraphQLObjectType({
      name: this.__name,
      fields: this.__fields
    })

    return this.__parent ? this.__parent.setQuery(query) : this
  }
}

export default Query
