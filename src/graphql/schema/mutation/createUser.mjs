import bind from "core/graphql/bindResolver"

import TUserInput from "graphql/input/user/TUserInput"
import TAuthTokenPayload from "graphql/type/auth/TAuthTokenPayload"

import createUser from "graphql/resolve/mutation/user/createUser"

const resolve = {
  type: TAuthTokenPayload,
  required: true,
  handler: bind(createUser),
  description: (
    "This method will create a new user using basic information."
  )
}

const user = {
  type: TUserInput,
  required: true
}

const args = {user}

export {resolve, args}
