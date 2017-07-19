import {
  GraphQLID as TID,
  GraphQLString as TString,
} from "graphql"
import Type from "parasprite/Type"

const TChapter = Type("Chapter", "Represends information about chapter")
  .field("id", TID, true)
  .field("title", TString, true)
  .field("text", TString, true)
  .field("rendered", TString, true)
.end()

export default TChapter
