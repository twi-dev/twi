import Union from "parasprite/Union"

import TRemovedStory from "./TRemovedStory"
import TStory from "./TStory"

const types = [TStory, TRemovedStory]

const TStoryOrRemovedStory = Union("StoryOrRemovedStory", types)
  .match(({isDeleted}) => isDeleted && TRemovedStory)
  .match(() => TStory)
.end()

export default TStoryOrRemovedStory
