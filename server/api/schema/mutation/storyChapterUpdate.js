import {GraphQLNonNull as Required} from "graphql"

import TStoryChapterUpdateInput from "api/input/story/TStoryChapterUpdateInput"
import update from "api/resolve/mutation/story/chapterUpdate"
import TChapter from "api/type/story/TStoryChapter"

/** @type {import("graphql").GraphQLFieldConfig} */
const field = {
  type: new Required(TChapter),
  resolve: update,
  args: {
    story: {
      type: new Required(TStoryChapterUpdateInput)
    }
  }
}

export default field
