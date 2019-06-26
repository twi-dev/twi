import TAuthSignUpInput from "api/input/auth/TAuthSignUpInput"
import TAuthTokens from "api/type/auth/TAuthTokens"

import signUp from "api/resolve/mutation/auth/signUp"

const resolve = {
  type: TAuthTokens,
  required: true,
  handler: signUp,
  description: "Create a new user with basic information."
}

const args = {
  user: [TAuthSignUpInput, true]
}

export {resolve, args}
