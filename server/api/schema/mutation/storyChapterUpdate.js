import {GraphQLNonNull as Required} from "graphql"

import TChapterUpdate from "server/api/input/story/TStoryChapterUpdateInput"
import update from "server/api/resolve/mutation/story/chapterUpdate"
import TChapter from "server/api/type/story/TStoryChapter"

/** @type {import("graphql").GraphQLFieldConfig} */
const field = {
  type: new Required(TChapter),
  resolve: update,
  args: {
    story: {
      type: new Required(TChapterUpdate)
    }
  }
}

export default field
