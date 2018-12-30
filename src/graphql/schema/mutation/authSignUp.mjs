import TAuthSignUpInput from "graphql/input/auth/TAuthSignUpInput"
import TAuthTokenPayload from "graphql/type/auth/TAuthTokenPayload"

import signUp from "graphql/resolve/mutation/auth/signUp"

const resolve = {
  type: TAuthTokenPayload,
  required: true,
  handler: signUp,
  description: "Create a new user with basic information."
}

const args = {
  user: [TAuthSignUpInput, true]
}

export {resolve, args}
