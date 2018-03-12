import TStoryInput from "graphql/input/story/TStoryInput"
import TStory from "graphql/type/story/TStory"

import addStory from "graphql/resolve/mutation/story/addStory"

const resolve = {
  type: TStory,
  required: true,
  handler: addStory
}

const story = {
  type: TStoryInput,
  required: true
}

const args = {story}

export {resolve, args}
