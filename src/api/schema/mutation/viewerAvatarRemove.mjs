import {GraphQLInt as TInt} from "graphql"

import remove from "api/resolve/mutation/user/avatarRemove"

const resolve = {
  type: TInt,
  required: true,
  handler: remove,
  description: "Removes user's avatar."
}

export {resolve}
