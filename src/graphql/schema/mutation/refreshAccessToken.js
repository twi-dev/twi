import {GraphQLString as TString} from "graphql"

import TAccessToken from "graphql/type/auth/TAccessToken"

import refresh from "graphql/resolve/mutation/auth/refreshAccessToken"

const resolve = {
  type: TAccessToken,
  required: true,
  handler: refresh
}

const refreshToken = [TString, true]

const args = {refreshToken}

export {resolve, args}
