import TStoryInput from "api/input/story/TStoryAddInput"
import TStory from "api/type/story/TStory"

import add from "api/resolve/mutation/story/add"

const resolve = {
  type: TStory,
  required: true,
  handler: add
}

const args = {
  story: TStoryInput
}

export {resolve, args}
