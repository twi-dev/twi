import {GraphQLInt as TInt} from "graphql"

import TStoryChapter from "api/type/story/TStoryChapter"
import chapter from "api/resolve/query/story/chapter"

const resolve = {
  type: TStoryChapter,
  handler: chapter,
  required: true
}

const args = {
  storyId: [TInt, true],
  chapterNumber: {
    type: TInt,
    required: true,
    description: "A number of the chapter within the story."
  }
}

export {resolve, args}
