import TAuthSignUpInput from "graphql/input/auth/TAuthSignUpInput"
import TAuthTokens from "graphql/type/auth/TAuthTokens"

import signUp from "graphql/resolve/mutation/auth/signUp"

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
