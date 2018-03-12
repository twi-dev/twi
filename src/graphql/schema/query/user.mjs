import TUser from "graphql/type/user/TUser"
import TLogin from "graphql/scalar/user/TLogin"

import findUserByLogin from "graphql/resolve/query/user/findUserByLogin"

const resolve = {
  type: TUser,
  required: true,
  handler: findUserByLogin,
  description: "Get full user information, including created stories."
}

const login = {
  type: TLogin,
  required: true,
  description: "Just an user unique login."
}

const args = {login}

export {resolve, args}
