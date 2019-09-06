import {GraphQLInt as TInt} from "graphql"

import remove from "api/resolve/mutation/story/remove"

const resolve = {
  type: TInt,
  required: true,
  handler: remove
}

const args = {
  storyId: [TInt, true]
}

export {resolve, args}
