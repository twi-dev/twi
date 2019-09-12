import {GraphQLInt as TInt} from "graphql"

import Input from "parasprite/Input"

import TChapterUpdateInput from "api/input/chapter/TChapterUpdateInput"

const TStoryChapterUpdateInput = Input("StoryChapterUpdateInput")
  .field({
    name: "id",
    type: TInt,
    required: true
  })
  .field({
    name: "chapter",
    type: TChapterUpdateInput,
    required: true
  })
.end()

export default TStoryChapterUpdateInput
