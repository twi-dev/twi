import {GraphQLInt as TInt, GraphQLNonNull as Required} from "graphql"

import TStoryOrStoryRemoved from "api/type/story/TStoryOrStoryRemoved"

import story from "api/resolve/query/story/story"

/** @type {import("graphql").GraphQLFieldConfig} */
const field = {
  type: new Required(TStoryOrStoryRemoved),
  description: "Returns a story with given ID.",
  resolve: story,
  args: {
    id: {
      type: new Required(TInt)
    }
  }
}

export default field
