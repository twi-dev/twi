import proxy from "server/core/helper/decorator/proxy"
import apply from "server/core/helper/proxy/selfInvokingClass"

import {
  GraphQLNonNull
} from "graphql"

import Base from "./Base"

@proxy({apply})
class Resolver extends Base {
  constructor(cb) {
    super(cb)

    this.__callee = null
    this.__arguments = {}
  }

  resolve(callee) {
    this.__callee = callee

    return this
  }

  arg(name, type, required = false) {
    this.__arguments[name] = {
      type: required ? GraphQLNonNull(type) : type
    }

    return this
  }

  end() {
    const resolver = {
      resolve: this.__callee,
      args: this.__arguments
    }

    return super.end(resolver)
  }
}

export default Resolver
