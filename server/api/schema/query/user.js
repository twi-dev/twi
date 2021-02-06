import {GraphQLNonNull as Required} from "graphql"

import TUser from "server/api/type/user/TUser"
import TLogin from "server/api/scalar/user/TLogin"

import user from "server/api/resolve/query/user"

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
