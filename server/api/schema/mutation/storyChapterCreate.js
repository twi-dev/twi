import {GraphQLNonNull as Required} from "graphql"

import TChapterCreate from "server/api/input/story/TStoryChapterCreateInput"
import TChapter from "server/api/type/story/TStoryChapter"

import create from "server/api/resolve/mutation/story/chapterCreate"

/** @type {import("graphql").GraphQLFieldConfig} */
const field = {
  type: new Required(TChapter),
  resolve: create,
  args: {
    story: {
      type: new Required(TChapterCreate)
    }
  }
}

export default field
