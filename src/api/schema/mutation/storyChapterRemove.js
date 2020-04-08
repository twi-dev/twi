import {GraphQLInt as TInt} from "graphql"

import remove from "api/resolve/mutation/story/chapterRemove"

const resolve = {
  type: TInt,
  required: true,
  handler: remove
}

const args = {
  chapterId: [TInt, true]
}

export {resolve, args}
