import {GraphQLNonNull as Required} from "graphql"

import TStoryUpdateInput from "server/api/input/story/TStoryUpdateInput"
import TStory from "server/api/type/story/TStory"

import update from "server/api/resolve/mutation/story/update"

/** @type {import("graphql").GraphQLFieldConfig} */
const field = {
  type: new Required(TStory),
  description: "Updates a story associated with given ID.",
  resolve: update,
  args: {
    story: {
      type: new Required(TStoryUpdateInput)
    }
  }
}

export default field
