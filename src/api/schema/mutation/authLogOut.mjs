import {GraphQLString as TString} from "graphql"

import TRefreshToken from "api/type/auth/TAuthRefreshToken"
import logOut from "api/resolve/mutation/auth/logOut"

const resolve = {
  type: TRefreshToken,
  handler: logOut,
  required: true
}

const args = {
  refreshToken: [TString, true]
}

export {resolve, args}
