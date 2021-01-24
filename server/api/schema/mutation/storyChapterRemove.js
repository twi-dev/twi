import {GraphQLInt as TInt, GraphQLNonNull as Required} from "graphql"

import remove from "api/resolve/mutation/story/chapterRemove"

/** @type {import("graphql").GraphQLFieldConfig} */
const field = {
  type: new Required(TInt),
  resolve: remove,
  args: {
    chapterId: {
      type: new Required(TInt)
    }
  }
}

export default field
