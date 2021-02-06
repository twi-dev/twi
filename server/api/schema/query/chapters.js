import {GraphQLInt as TInt, GraphQLNonNull as Required} from "graphql"

import TStoryChapterPage from "server/api/type/story/TStoryChapterPage"

import list from "server/api/resolve/query/story/chapter/list"

/** @type {import("graphql").GraphQLFieldConfig} */
const field = {
  type: new Required(TStoryChapterPage),
  description: "Returns a list of the story chapters",
  resolve: list,
  args: {
    storyId: {
      type: new Required(TInt)
    },
    page: {
      type: TInt,
      description: "Page offset"
    }
  }
}

export default field
