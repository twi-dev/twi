import {GraphQLInt as TInt} from "graphql"

import TStoryOrStoryRemoved from "api/type/story/TStoryOrStoryRemoved"

import story from "api/resolve/query/story/story"

const resolve = {
  type: TStoryOrStoryRemoved,
  required: true,
  handler: story,
  description: "Get a story by its ID."
}

const args = {
  id: [TInt, true]
}

export {resolve, args}
