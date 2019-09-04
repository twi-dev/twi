import {GraphQLInt as TInt} from "graphql"

import TUser from "api/type/user/TUser"
import createPageType from "api/type/abstract/createPageType"

import list from "api/resolve/query/user/list"

const resolve = {
  type: createPageType(TUser),
  required: true,
  handler: list,
  description: "Get all available users (only 10 per page)."
}

const page = {
  type: TInt,
  description: "The page offset."
}

const args = {page}

export {resolve, args}
