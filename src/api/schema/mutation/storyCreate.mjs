import TStoryAddInput from "api/input/story/TStoryAddInput"
import TStory from "api/type/story/TStory"

import create from "api/resolve/mutation/story/create"

const resolve = {
  type: TStory,
  handler: create,
  required: true
}

const args = {
  story: [TStoryAddInput, true]
}

export {resolve, args}
