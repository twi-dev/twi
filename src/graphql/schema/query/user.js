import TUser from "graphql/type/user/TUser"
import TLogin from "graphql/scalar/user/TLogin"

import getUser from "graphql/resolve/query/user/getUser"

const resolve = {
  type: TUser,
  required: true,
  handler: getUser,
}

const login = {
  type: TLogin,
  required: true
}

const args = {login}

export {resolve, args}
