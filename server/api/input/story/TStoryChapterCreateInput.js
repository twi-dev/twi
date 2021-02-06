import {GraphQLInt as TInt} from "graphql"

import Input from "parasprite/Input"

import TStoryChapterInput from "server/api/input/story/TStoryChapterInput"

const TStoryChapterCreateInput = Input("StoryChapterCreateInput")
  .field({
    name: "id",
    type: TInt,
    required: true
  })
  .field({
    name: "chapter",
    type: TStoryChapterInput,
    required: true
  })
.end()

export default TStoryChapterCreateInput
