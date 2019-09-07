import {GraphQLInt as TInt} from "graphql"

import Input from "parasprite/Input"

import TChapterCreateInput from "api/input/chapter/TChapterCreateInput"

const TStoryChapterCreateInput = Input("StoryhapterCreateInput")
  .field({
    name: "id",
    type: TInt,
    required: true
  })
  .field({
    name: "chapter",
    type: TChapterCreateInput,
    required: true
  })
.end()

export default TStoryChapterCreateInput
