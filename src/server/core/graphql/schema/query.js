import {GraphQLObjectType} from "graphql"

import proxy from "server/core/helper/decorator/proxy"
import apply from "server/core/helper/proxy/selfInvokingClass"

@proxy({apply})
class Query {
  constructor(name, description) {
    this._name = name || "Query"
    this._description = description || ""
    this._fields = {}
  }

  field(type, name, resolve) {
    this._fields[name] = {type, resolve}
  }

  end() {
    const query = new GraphQLObjectType({
      name: this._name,
      fields: this._fields
    })

    return query
  }
}

export default Query
