import TChapterUpdateInput from "api/input/chapter/TChapterUpdateInput"
import update from "api/resolve/mutation/story/chapterUpdate"
import TChapter from "api/type/story/TStoryChapter"

const resolve = {
  type: TChapter,
  required: true,
  handler: update
}

const args = {
  story: [TChapterUpdateInput, true]
}

export {resolve, args}
