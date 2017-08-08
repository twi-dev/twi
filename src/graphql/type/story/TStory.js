import {GraphQLString as TString, GraphQLInt as TInt} from "graphql"

import Type from "parasprite/Type"

import TChapter from "./TChapter"
import TStoryDates from "./TStoryDates"

import TAuthor from "../user/TAuthor"

import findChaptersById from "../../resolve/query/story/findChaptersById"

const TStory = Type(
  "Story", "Represends available information about the stories"
)
  .field("title", TString, true)
  .field("description", TString, true)
  .field("author", TAuthor, true)
  .field("slug", TString, true)
  .field("dates", TStoryDates, true)
  .resolve("chapters", [TChapter, true], true, findChaptersById)
    .arg("cursor", TInt)
  .end()
.end()

export default TStory
