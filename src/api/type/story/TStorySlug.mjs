import {GraphQLString as TString} from "graphql"

import Type from "parasprite/Type"

const TStorySlug = Type({
  name: "StorySlug",
  description: "End-user story's identifiers."
})
  .field({
    name: "full",
    type: TString,
    required: true
  })
  .field({
    name: "short",
    type: TString,
    required: true
  })
.end()

export default TStorySlug
