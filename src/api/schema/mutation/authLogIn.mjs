import TAuthTokens from "api/type/auth/TAuthTokens"
import TAuthLogInInput from "api/input/auth/TAuthLogInInput"

import logIn from "api/resolve/mutation/auth/logIn"

const resolve = {
  type: TAuthTokens,
  required: true,
  handler: logIn,
  description: "Creates a new session for user found by given credentials."
}

const user = [TAuthLogInInput, true]

const args = {user}

export {resolve, args}
