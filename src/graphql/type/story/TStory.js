import {
  GraphQLString as TString,
  GraphQLInt as TInt,
  GraphQLID as TID
} from "graphql"

import Type from "parasprite/Type"

import TChapter from "./TChapter"
import TStoryCollaborator from "./TStoryCollaborator"

import TDates from "../common/TDates"
import TPublisher from "../user/TPublisher"

import INode, {isTypeOf} from "../../interface/common/INode"

import findChaptersById from "../../resolve/query/story/findChaptersById"

const TStory = Type(
  "Story", "Represends available information about the stories",
  [INode], isTypeOf
)
  .field("id", TID, true)
  .field("title", TString, true)
  .field("description", TString, true)
  .field("publisher", TPublisher, true)
  .field("collaborators", [TStoryCollaborator, true])
  .field("slug", TString, true)
  .field("dates", TDates, true)
  .resolve("chapters", [TChapter, true], true, findChaptersById)
    .arg("cursor", TInt)
  .end()
.end()

export default TStory
