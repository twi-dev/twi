import {GraphQLString as TString} from "graphql"

import TAuthAccessToken from "graphql/type/auth/TAuthAccessToken"

import refresh from "graphql/resolve/mutation/auth/refreshAccessToken"

const resolve = {
  type: TAuthAccessToken,
  required: true,
  handler: refresh
}

const args = {
  refreshToken: [TString, true]
}

export {resolve, args}
