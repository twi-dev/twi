import TTokenPayload from "graphql/type/auth/TTokenPayload"
import TAuthInput from "graphql/input/auth/TAuthInput"

import authenticate from "graphql/resolve/mutation/auth/authenticate"

const resolve = {
  type: TTokenPayload,
  required: true,
  handler: authenticate
}

const credentials = [TAuthInput, true]

const args = {credentials}

export {resolve, args}
