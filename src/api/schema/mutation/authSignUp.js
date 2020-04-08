import TAuthSignUpInput from "api/input/auth/TAuthSignUpInput"
import TAuthTokens from "api/type/auth/TAuthTokens"

import signUp from "api/resolve/mutation/auth/signUp"

const resolve = {
  type: TAuthTokens,
  required: true,
  handler: signUp,
  description: "Creates a new user account filled with minimal information."
}

const args = {
  user: [TAuthSignUpInput, true]
}

export {resolve, args}
