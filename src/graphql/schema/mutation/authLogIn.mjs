import TAuthTokens from "graphql/type/auth/TAuthTokens"
import TAuthLogInInput from "graphql/input/auth/TAuthLogInInput"

import logIn from "graphql/resolve/mutation/auth/logIn"

const resolve = {
  type: TAuthTokens,
  required: true,
  handler: logIn
}

const user = [TAuthLogInInput, true]

const args = {user}

export {resolve, args}
