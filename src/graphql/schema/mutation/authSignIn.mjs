import TAuthTokenPayload from "graphql/type/auth/TAuthTokenPayload"
import TAuthSignInInput from "graphql/input/auth/TAuthSignInInput"

import signIn from "graphql/resolve/mutation/auth/signIn"

const resolve = {
  type: TAuthTokenPayload,
  required: true,
  handler: signIn
}

const credentials = [TAuthSignInInput, true]

const args = {credentials}

export {resolve, args}
