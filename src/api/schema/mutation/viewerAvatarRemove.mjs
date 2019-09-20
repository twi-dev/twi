import {GraphQLInt as TInt} from "graphql"

import remove from "api/resolve/mutation/user/avatarRemove"

const resolve = {
  type: TInt,
  required: true,
  handler: remove
}

export {resolve}
