import {GraphQLString as TString, GraphQLInt as TInt} from "graphql"
import {GraphQLDateTime as TDateTime} from "graphql-iso-date"
import Type from "parasprite/Type"

const TStory = Type(
  "Story", "Represends available information about the stories"
)
  .field("title", TString, true)
  .field("description", TString, true)
  .field("authors", [TString, true], true) // TODO: Replate type with TAuthor
  .field("slug", TString, true)
  .field("createdAt", TDateTime, true)
  .resolve("chapters", [TString, true], true, () => {})
    .arg("cursor", TInt)
  .end()
.end()

export default TStory
