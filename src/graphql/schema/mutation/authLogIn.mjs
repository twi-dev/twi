import TAuthTokens from "graphql/type/auth/TAuthTokens"
import TAuthLogInInput from "graphql/input/auth/TAuthLogInInput"

import signIn from "graphql/resolve/mutation/auth/signIn"

const resolve = {
  type: TAuthTokens,
  required: true,
  handler: signIn
}

const credentials = [TAuthLogInInput, true]

const args = {credentials}

export {resolve, args}
