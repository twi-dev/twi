import {GraphQLInt as TInt} from "graphql"

import TChapterUnion from "api/type/story/TStoryChapterOrStoryChapterRemoved"
import chapter from "api/resolve/query/story/chapter"

const resolve = {
  type: TChapterUnion,
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
