import {GraphQLInt as TInt} from "graphql"

import TStory from "graphql/type/story/TStory"
import findStories from "graphql/resolve/query/story/findStories"

const resolve = {
  type: [TStory],
  required: true,
  handler: findStories
}

const cursor = {
  type: TInt
}

const args = {cursor}

export {
  resolve,
  args
}
