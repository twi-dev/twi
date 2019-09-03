import TStoryAddInput from "api/input/story/TStoryAddInput"
import TStory from "api/type/story/TStory"

import add from "api/resolve/mutation/story/add"

const resolve = {
  type: TStory,
  handler: add,
  required: true
}

const args = {
  story: [TStoryAddInput, true]
}

export {resolve, args}
