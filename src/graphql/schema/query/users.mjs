import {GraphQLInt as TInt} from "graphql"

import TUser from "graphql/type/user/TUser"
import list from "graphql/resolve/query/user/list"

const resolve = {
  type: [TUser],
  required: true,
  handler: list,
  description: "Get all available users (only 10 per page)."
}

const cursor = {
  type: TInt,
  description: "Just a position at users list (aka page number)."
}

const args = {cursor}

export {resolve, args}
