import TStoryInput from "graphql/input/story/TStoryInput"
import TStory from "graphql/type/story/TStory"

import createStory from "graphql/resolve/mutation/story/createStory"

const resolve = {
  type: TStory,
  required: true,
  handler: createStory
}

const story = {
  type: TStoryInput,
  required: true
}

const args = {story}

export {resolve, args}
