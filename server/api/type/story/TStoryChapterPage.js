import createPageType from "server/api/type/abstract/createPageType"

import TStoryChapter from "./TStoryChapter"

const TStoryChapterPage = createPageType({
  type: [TStoryChapter, true]
})

export default TStoryChapterPage
