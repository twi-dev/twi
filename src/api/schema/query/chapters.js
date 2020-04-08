import {GraphQLInt as TInt} from "graphql"

import TStoryChapterPage from "api/type/story/TStoryChapterPage"

import list from "api/resolve/query/story/chapter/list"

const resolve = {
  type: TStoryChapterPage,
  required: true,
  handler: list,
  description: "Get a list of published stories."
}

const args = {
  storyId: [TInt, true],
  page: {
    type: TInt,
    description: "The page offset."
  }
}

export {resolve, args}
