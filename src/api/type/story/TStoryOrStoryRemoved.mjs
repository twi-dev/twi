import Union from "parasprite/Union"

import TStoryRemoved from "./TStoryRemoved"
import TStory from "./TStory"

const types = [TStory, TStoryRemoved]

const TStoryOrStoryRemoved = Union("StoryOrStoryRemoved", types)
  .match(({isRemoved}) => isRemoved && TStoryRemoved)
  .match(() => TStory)
.end()

export default TStoryOrStoryRemoved
