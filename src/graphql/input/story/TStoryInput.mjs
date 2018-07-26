import {GraphQLID as TID, GraphQLString as TString} from "graphql"

import Input from "parasprite/Input"

import TChapterInput from "./TChapterInput"

const TStoryInput = Input("StoryInput")
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
    name: "characters",
    type: [TID, true],
    required: true
  })
  .field({
    name: "genres",
    type: [TID, true],
    required: true
  })
  .field({
    name: "chapters",
    type: [TChapterInput, true]
  })
.end()

export default TStoryInput
