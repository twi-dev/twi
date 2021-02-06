import {GraphQLString as TString, GraphQLInt as TInt} from "graphql"

import Type from "parasprite/Type"

const TStoryChapter = Type({
  name: "StoryChapter",
  description: "Represends information about chapter"
})
  .field({
    name: "id",
    type: TInt,
    required: true
  })
  .field({
    name: "title",
    type: TString,
    required: true
  })
  .field({
    name: "content",
    type: TString,
    required: true,
    noArgs: true,
  })
.end()

export default TStoryChapter
