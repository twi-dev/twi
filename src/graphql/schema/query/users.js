import {GraphQLInt as TInt} from "graphql"

import TUser from "graphql/type/user/TUser"
import findUsers from "graphql/resolve/query/user/findUsers"

const resolve = {
  type: [TUser],
  required: true,
  handler: findUsers
}

const cursor = {
  type: TInt
}

const args = {cursor}

export {
  resolve,
  args
}
