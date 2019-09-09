import TStoryChapterCreate from "api/input/story/TStoryChapterCreateInput"
import TChapter from "api/type/story/TStoryChapter"

import create from "api/resolve/mutation/story/chapterCreate"

const resolve = {
  type: TChapter,
  required: true,
  handler: create
}

const args = {
  story: [TStoryChapterCreate, true]
}

export {resolve, args}
