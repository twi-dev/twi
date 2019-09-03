import {GraphQLString as TString, GraphQLInt as TInt} from "graphql"

import Type from "parasprite/Type"

import TChapterContent from "api/type/story/TChapterContent"

const TChapter = Type("Chapter", "Represends information about chapter")
  .field({name: "id", type: TInt, required: true})
  .field({name: "title", type: TString, required: true})
  .field({name: "content", type: TChapterContent, required: true})
.end()

export default TChapter
