import {GraphQLString as TString} from "graphql"

import Type from "parasprite/Type"

import TObjectID from "api/scalar/common/TObjectID"
import TChapterContent from "api/type/story/TChapterContent"

const TChapter = Type("Chapter", "Represends information about chapter")
  .field({name: "id", type: TObjectID, required: true})
  .field({name: "title", type: TString, required: true})
  .field({name: "content", type: TChapterContent, required: true})
.end()

export default TChapter
