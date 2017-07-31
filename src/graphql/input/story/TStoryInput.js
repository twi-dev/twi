import {GraphQLID as TID, GraphQLString as TString} from "graphql"
import Input from "parasprite/Input"

import TChapterInput from "./TChapterInput"

const TStoryInput = Input("StoryInput")
  .field("title", TString, true)
  .field("description", TString, true)
  .field("characters", [TID, true], true)
  .field("genres", [TID, true], true)
  .field("chapter", TChapterInput)
.end()

export default TStoryInput
