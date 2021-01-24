import {GraphQLNonNull as Required} from "graphql"

import TStoryUpdateInput from "api/input/story/TStoryUpdateInput"
import TStory from "api/type/story/TStory"

import update from "api/resolve/mutation/story/update"

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
