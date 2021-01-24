import {GraphQLNonNull as Required} from "graphql"

import TStoryChapterCreate from "api/input/story/TStoryChapterCreateInput"
import TChapter from "api/type/story/TStoryChapter"

import create from "api/resolve/mutation/story/chapterCreate"

/** @type {import("graphql").GraphQLFieldConfig} */
const field = {
  type: new Required(TChapter),
  resolve: create,
  args: {
    story: {
      type: new Required(TStoryChapterCreate)
    }
  }
}

export default field
