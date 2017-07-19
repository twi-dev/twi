import TStoryInput from "server/api/graphql/input/story/TStoryInput"
import TStory from "server/api/graphql/type/story/TStory"

import createStory from "../../resolve/mutation/story/createStory"

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
