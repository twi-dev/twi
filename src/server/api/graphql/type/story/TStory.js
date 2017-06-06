import {GraphQLString as TString, GraphQLInt as TInt} from "graphql"
import {GraphQLDateTime as TDateTime} from "graphql-iso-date"
import Type from "parasprite/Type"

import Chapter from "server/api/database/model/Chapter"

import TChapter from "./TChapter"

// tmp
const resolveChapters = (_, {cursor}) => Chapter.getChapters(cursor)

const TStory = Type(
  "Story", "Represends available information about the stories"
)
  .field("title", TString, true)
  .field("description", TString, true)
  .field("authors", [TString, true], true) // TODO: Replate type with TAuthor
  .field("slug", TString, true)
  .field("createdAt", TDateTime, true)
  .resolve("chapters", [TChapter, true], true, resolveChapters)
    .arg("cursor", TInt)
  .end()
.end()

export default TStory
