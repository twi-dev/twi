import createPageType from "api/type/abstract/createPageType"

import TStoryTag from "./TStoryTag"

const TStoryTagPage = createPageType({
  type: [TStoryTag, true]
})

export default TStoryTagPage
