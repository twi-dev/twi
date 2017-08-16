import {GraphQLInt as TInt} from "graphql"

import TStory from "graphql/type/story/TStory"
import findStories from "graphql/resolve/query/story/findStories"

const resolve = {
  type: [TStory],
  required: true,
  handler: findStories,
  description: "Get all available stories (only 10 per page)."
}

const cursor = {
  type: TInt,
  description: "Just a position at stories list (aka page number)."
}

const args = {cursor}

export {
  resolve,
  args
}
