import {GraphQLInt as TInt, GraphQLNonNull as Required} from "graphql"

import remove from "server/api/resolve/mutation/user/avatarRemove"

/** @type {import("graphql").GraphQLFieldConfig} */
const field = {
  type: new Required(TInt),
  description: "Removes user's avatar.",
  resolve: remove
}

export default field
