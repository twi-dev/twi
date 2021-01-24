import Type from "parasprite/Type"

import TStoryTagCategoryTag from "./TStoryTagCategoryTag"
import TStoryTagCategoryMinimal from "./TStoryTagCategoryMinimal"

const TStoryTag = Type({name: "StoryTag", extends: TStoryTagCategoryTag})
  .field({
    name: "category",
    type: TStoryTagCategoryMinimal
  })
.end()

export default TStoryTag
