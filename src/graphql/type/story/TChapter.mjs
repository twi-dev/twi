import {GraphQLID as TID, GraphQLString as TString} from "graphql"

import Type from "parasprite/Type"

import TChapterContent from "./TChapterContent"

const TChapter = Type("Chapter", "Represends information about chapter")
  .field({name: "id", type: TID, required: true})
  .field({name: "title", type: TString, required: true})
  .field({name: "content", type: TChapterContent, required: true})
.end()

export default TChapter
