import {GraphQLInt as TInt} from "graphql"

import TStory from "api/type/story/TStory"

import story from "api/resolve/query/story/story"

const resolve = {
  type: TStory,
  required: true,
  handler: story,
  description: "Get a story by its ID."
}

const args = {
  id: [TInt, true]
}

export {resolve, args}
