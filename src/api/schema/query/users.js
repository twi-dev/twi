import {GraphQLInt as TInt} from "graphql"

import TUserPage from "api/type/user/TUserPage"

import list from "api/resolve/query/user/list"

const resolve = {
  type: TUserPage,
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
