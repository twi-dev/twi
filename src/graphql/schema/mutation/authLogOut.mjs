import {GraphQLString as TString} from "graphql"

import TRefreshToken from "graphql/type/auth/TAuthRefreshToken"
import logOut from "graphql/resolve/mutation/auth/logOut"

const resolve = {
  type: TRefreshToken,
  handler: logOut,
  required: true
}

const args = {
  refreshToken: [TString, true]
}

export {resolve, args}
