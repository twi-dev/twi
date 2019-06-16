import {GraphQLInt as TInt} from "graphql"

import TUser from "graphql/type/user/TUser"
import findUsers from "graphql/resolve/query/user/findUsers"

const resolve = {
  type: [TUser],
  required: true,
  handler: findUsers,
  description: "Get all available users (only 10 per page)."
}

const cursor = {
  type: TInt,
  description: "Just a position at users list (aka page number)."
}

const args = {cursor}

export {resolve, args}
