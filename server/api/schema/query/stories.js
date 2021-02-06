import {GraphQLInt as TInt, GraphQLNonNull as Required} from "graphql"

import TStoryPage from "server/api/type/story/TStoryPage"

import list from "server/api/resolve/query/story/list"

/** @type {import("graphql").GraphQLFieldConfig} */
const field = {
  type: new Required(TStoryPage),
  description: "Returns a list of published stories.",
  resolve: list,
  args: {
    page: {
      type: TInt,
      description: "Page offset."
    }
  }
}

export default field
