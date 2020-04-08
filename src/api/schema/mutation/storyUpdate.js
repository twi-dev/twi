import TStoryUpdateInput from "api/input/story/TStoryUpdateInput"
import TStory from "api/type/story/TStory"

import update from "api/resolve/mutation/story/update"

const resolve = {
  type: TStory,
  required: true,
  handler: update,
  description: "Updates a story associated with given ID."
}

const args = {
  story: [TStoryUpdateInput, true]
}

export {resolve, args}
