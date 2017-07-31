import {GraphQLString as TString} from "graphql"

import Type from "parasprite/Type"

const TChapterContent = Type("ChapterContent")
  .field("original", TString, true)
  .field("rendered", TString, true)
.end()

export default TChapterContent
