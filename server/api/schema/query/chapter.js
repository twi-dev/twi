import {GraphQLInt as TInt, GraphQLNonNull as Required} from "graphql"

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

/** @type {import("graphql").GraphQLFieldConfig} */
const field = {
  type: new Required(TChapterUnion),
  resolve: chapter,
  args: {
    storyId: {
      type: new Required(TInt),
    },
    chapterNumber: {
      type: new Required(TInt),
      description: "Chapter number withn the story."
    }
  }
}

export default field
