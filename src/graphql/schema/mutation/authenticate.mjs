import TAuthTokenPayload from "graphql/type/auth/TAuthTokenPayload"
import TAuthInput from "graphql/input/auth/TAuthInput"

import authenticate from "graphql/resolve/mutation/auth/authenticate"

const resolve = {
  type: TAuthTokenPayload,
  required: true,
  handler: authenticate
}

const credentials = [TAuthInput, true]

const args = {credentials}

export {resolve, args}
