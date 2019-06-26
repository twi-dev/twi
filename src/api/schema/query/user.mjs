import TUser from "api/type/user/TUser"
import TLogin from "api/scalar/user/TLogin"

import findByLogin from "api/resolve/query/user/findByLogin"

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
