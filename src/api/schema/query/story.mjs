import {GraphQLInt as TInt} from "graphql"

import TStoryOrRemovedStory from "api/type/story/TStoryOrRemovedStory"

import story from "api/resolve/query/story/story"

const resolve = {
  type: TStoryOrRemovedStory,
  required: true,
  handler: story,
  description: "Get a story by its ID."
}

const args = {
  id: [TInt, true]
}

export {resolve, args}
