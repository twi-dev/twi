import {GraphQLString as TString} from "graphql"
import Input from "parasprite/Input"

const TChapterInput = Input("ChapterInput")
  .field("title", TString, true)
  .field("text", TString, true)
.end()

export default TChapterInput
