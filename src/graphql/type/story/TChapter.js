import {
  GraphQLID as TID,
  GraphQLString as TString,
} from "graphql"
import Type from "parasprite/Type"

import TChapterContent from "./TChapterContent"

const TChapter = Type("Chapter", "Represends information about chapter")
  .field("id", TID, true)
  .field("title", TString, true)
  .field("content", TChapterContent, true)
.end()

export default TChapter
