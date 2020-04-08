import TStoryCreateInput from "api/input/story/TStoryCreateInput"
import TStory from "api/type/story/TStory"

import create from "api/resolve/mutation/story/create"

const resolve = {
  type: TStory,
  handler: create,
  required: true,
  description: "Creates a new story."
}

const args = {
  story: [TStoryCreateInput, true]
}

export {resolve, args}
