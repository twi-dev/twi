import {GraphQLInt as TInt} from "graphql"

import TStoryPage from "api/type/story/TStoryPage"

import list from "api/resolve/query/story/list"

const resolve = {
  type: TStoryPage,
  required: true,
  handler: list,
  description: "Get a list of published stories."
}

const page = {
  type: TInt,
  description: "The page offset."
}

const args = {page}

export {resolve, args}
