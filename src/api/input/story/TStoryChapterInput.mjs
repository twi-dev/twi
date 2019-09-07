import {GraphQLInt as TInt} from "graphql"

import Input from "parasprite/Input"

import TChapterAddInput from "api/input/chapter/TChapterAddInput"

const TStoryChapterInput = Input("StoryChapterInput")
  .field({
    name: "id",
    type: TInt,
    required: true
  })
  .field({
    name: "chapter",
    type: TChapterAddInput,
    required: true
  })
.end()

export default TStoryChapterInput
