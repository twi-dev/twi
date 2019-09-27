import Union from "parasprite/Union"

import TStoryChapter from "./TStoryChapter"
import TStoryChapterRemoved from "./TStoryChapterRemoved"

const TStoryChapterOrStoryChapterRemoved = Union(
  "TStoryChapterOrStoryChapterRemoved",
  [TStoryChapter, TStoryChapterRemoved]
)
  .match(({isDeleted}) => isDeleted && TStoryChapterRemoved)
  .match(() => TStoryChapter)
.end()

export default TStoryChapterOrStoryChapterRemoved
