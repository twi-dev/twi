import {GraphQLString as TString} from "graphql"
import Input from "parasprite/Input"

import TChapterInput from "./TChapterInput"

const TStoryInput = Input("StoryInput")
  .field("title", TString, true)
  .field("description", TString, true)
  .field("chapter", TChapterInput)
.end()

export default TStoryInput
