import createPageType from "api/type/abstract/createPageType"

import TStoryChapter from "./TStoryChapter"

const TStoryChapterPage = createPageType({
  type: [TStoryChapter, true]
})

export default TStoryChapterPage
