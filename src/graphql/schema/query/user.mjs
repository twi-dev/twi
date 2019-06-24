import TUser from "graphql/type/user/TUser"
import TLogin from "graphql/scalar/user/TLogin"

import findByLogin from "graphql/resolve/query/user/findByLogin"

const resolve = {
  type: TUser,
  required: true,
  handler: findByLogin,
  description: "Get full user information, including created stories."
}

const login = {
  type: TLogin,
  required: true,
  description: "Just an user unique login."
}

const args = {login}

export {resolve, args}
