import {GraphQLString as TString} from "graphql"

import TAuthTokens from "api/type/auth/TAuthTokens"
import refresh from "api/resolve/mutation/auth/refreshTokens"

const resolve = {
  type: TAuthTokens,
  required: true,
  handler: refresh,
  description: "Refreshes tokens for the further authorizations "
    + "and returns the new pair."
}

const args = {
  refreshToken: [TString, true]
}

export {resolve, args}
