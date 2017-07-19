import TUser from "server/api/graphql/type/user/TUser"
import TLogin from "server/api/graphql/scalar/user/TLogin"

import getUser from "server/api/graphql/resolve/query/user/getUser"

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
