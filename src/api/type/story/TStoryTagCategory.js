import Type from "parasprite/Type"

import TStoryTagCategoryTag from "./TStoryTagCategoryTag"
import TStoryTagCategoryMinimal from "./TStoryTagCategoryMinimal"

const TStoryTagCategory = Type({
  name: "StoryTagCategory",
  extends: TStoryTagCategoryMinimal
})
  .field({
    name: "tags",
    type: [TStoryTagCategoryTag, true]
  })
.end()

export default TStoryTagCategory
