import {GraphQLInt as TInt, GraphQLNonNull as Required} from "graphql"

import remove from "server/api/resolve/mutation/story/remove"

/** @type {import("graphql").GraphQLFieldConfig} */
const field = {
  type: new Required(TInt),
  description: "Removes a story associated with given ID.",
  resolve: remove,
  args: {
    storyId: {
      type: new Required(TInt)
    }
  }
}

export default field
