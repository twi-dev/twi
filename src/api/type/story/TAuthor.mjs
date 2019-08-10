import {GraphQLString as TString} from "graphql"
import {GraphQLURL as TUrl} from "graphql-custom-types"

import Type from "parasprite/Type"

const TStoryAuthor = Type("StoryAuthor", "An author of the original story.")
  .field({
    name: "name",
    description: "Name or a nickname of the author",
    type: TString,
    required: true
  })
  .field({
    name: "profile",
    description: "A link to the author's profile or a website",
    type: TUrl
  })
.end()

export default TStoryAuthor
