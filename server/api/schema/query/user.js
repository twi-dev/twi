import {GraphQLNonNull as Required} from "graphql"

import TUser from "api/type/user/TUser"
import TLogin from "api/scalar/user/TLogin"

import user from "api/resolve/query/user"

/** @type {import("graphql").GraphQLFieldConfig} */
const field = {
  type: new Required(TUser),
  description: "Returns a user with given login",
  resolve: user,
  args: {
    login: {
      type: new Required(TLogin)
    }
  }
}

export default field
