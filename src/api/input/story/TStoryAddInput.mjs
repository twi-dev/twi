import {GraphQLString as TString} from "graphql"

import Input from "parasprite/Input"

import TObjectID from "api/scalar/common/TObjectID"
import TFileInput from "api/input/common/TFileInput"
import TChapterInput from "api/input/story/TChapterInput"

const TStoryAddInput = Input("StoryAddInput")
  .field({
    name: "title",
    type: TString,
    required: true
  })
  .field({
    name: "description",
    type: TString,
    required: true
  })
  .field({
    name: "cover",
    type: TFileInput
  })
  .field({
    name: "characters",
    type: [TObjectID, true]
  })
  .field({
    name: "genres",
    type: [TObjectID, true]
  })
  .field({
    name: "chapters",
    type: [TChapterInput, true]
  })
.end()

export default TStoryAddInput
