import TStoryChapterUpdateInput from "api/input/story/TStoryChapterUpdateInput"
import update from "api/resolve/mutation/story/chapterUpdate"
import TChapter from "api/type/story/TStoryChapter"

const resolve = {
  type: TChapter,
  required: true,
  handler: update
}

const args = {
  story: [TStoryChapterUpdateInput, true]
}

export {resolve, args}
