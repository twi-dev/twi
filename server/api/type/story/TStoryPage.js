import createPageType from "server/api/type/abstract/createPageType"

import TStory from "./TStory"

const TStoryPage = createPageType({
  type: [TStory, true]
})

export default TStoryPage
