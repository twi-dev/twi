import {GraphQLString as TString} from "graphql"

import TAuthAccessToken from "graphql/type/auth/TAuthAccessToken"

import refresh from "graphql/resolve/mutation/auth/refreshAccessToken"

const resolve = {
  type: TAuthAccessToken,
  required: true,
  handler: refresh
}

const refreshToken = [TString, true]

const args = {refreshToken}

export {resolve, args}
