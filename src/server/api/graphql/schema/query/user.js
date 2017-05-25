import {GraphQLString as TString} from "graphql"

import TUser from "server/api/graphql/type/user/TUser"

import getUser from "server/api/graphql/resolve/query/user/getUser"

const resolve = {
  type: TUser,
  required: true,
  handler: getUser,
}

const login = {
  type: TString,
  required: true
}

const args = {login}

export {resolve, args}
