import {GraphQLInt as TInt} from "graphql"

import remove from "api/resolve/mutation/story/remove"

const resolve = {
  type: TInt,
  required: true,
  handler: remove,
  description: "Removes a story associated with given ID."
}

const args = {
  storyId: [TInt, true]
}

export {resolve, args}
