import Union from "parasprite/Union"

import TFile from "api/type/common/TFile"
import TContentMap from "api/type/story/TChapterContentMap"

const TChapterContent = Union({
  name: "ChapterContent",
  types: [TFile, TContentMap]
})
  .match(({path, mime, hash, size, dates}) => (
    path && mime && hash && size && dates ? TFile : undefined
  ))

  .match(({md}) => md ? TContentMap : undefined)
.end()

export default TChapterContent
