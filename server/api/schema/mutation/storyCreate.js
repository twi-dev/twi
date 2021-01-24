import {GraphQLNonNull as Required} from "graphql"

import TStoryCreateInput from "api/input/story/TStoryCreateInput"
import TStory from "api/type/story/TStory"

import create from "api/resolve/mutation/story/create"

/** @type {import("graphql").GraphQLFieldConfig} */
const field = {
  type: new Required(TStory),
  description: "Creates a new story.",
  resolve: create,
  args: {
    story: {
      type: new Required(TStoryCreateInput)
    }
  }
}

export default field
