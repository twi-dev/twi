import {
  GraphQLID as TID,
  GraphQLInt as TInt,
  GraphQLString as TString
} from "graphql"
import Type from "parasprite/Type"

import TChapterContent from "./TChapterContent"

import INode, {isTypeOf} from "../../interface/common/INode"

const TChapter = Type(
  "Chapter", "Represends information about chapter", [INode], isTypeOf
)
  .field("id", TID, true)
  // .field("number", TInt, true)
  .field("title", TString, true)
  .field("content", TChapterContent, true)
.end()

export default TChapter
