import {GraphQLString as TString} from "graphql"

import Type from "parasprite/Type"

import words from "core/helper/string/concatWords"

import TObjectID from "api/scalar/common/TObjectID"
import TDates from "api/type/common/TDates"

import TStorySlug from "api/type/story/TStorySlug"
import TUserMinimal from "api/type/user/TUserMinimal"
import TStoryCollaborator from "api/type/story/TStoryCollaborator"

import user from "api/resolve/query/user/getById"

const TStoryMinimal = Type({
  name: "StoryMinimal",
  description: words([
    "Minimal information about the story.",
    "Such as its name and authors.",
    "No chapters information would be received from this type."
  ])
})
  .field({
    name: "id",
    type: TObjectID,
    required: true
  })
  .field({
    name: "title",
    type: TString,
    required: true,
    description: "A story main title."
  })
  .field({
    name: "description",
    type: TString,
    required: true,
    description: words([
      "A minimal story description.",
      "May basically explain what's this about",
      "or give any other information."
    ])
  })
  .resolve({
    name: "publisher",
    type: TUserMinimal,
    handler: user,
    required: true,
    noArgs: true
  })
  .field({
    name: "collaborators",
    type: [TStoryCollaborator, true]
  })
  .field({
    name: "slug",
    type: TStorySlug,
    required: true
  })
  .field({
    name: "dates",
    type: TDates,
    required: true
  })
.end()

export default TStoryMinimal
