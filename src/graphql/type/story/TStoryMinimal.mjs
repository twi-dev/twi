import {GraphQLString as TString, GraphQLID as TID} from "graphql"

import Type from "parasprite/Type"

import concat from "core/helper/string/concatWords"

import TDates from "../common/TDates"
import TUserMinimal from "../user/TUserMinimal"

import TStoryCollaborator from "./TStoryCollaborator"
import TStorySlug from "./TStorySlug"

const description = concat([
  "Minimal information about the story.",
  "Such as its name and authors.",
  "No chapters information would be received from this type."
])

const TStoryMinimal = Type("StoryMinimal", description)
  .field({
    name: "id",
    type: TID,
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
    description: concat([
      "A minimal story description.",
      "May basically explain what's this about",
      "or give any other information."
    ])
  })
  .field({
    name: "publisher",
    type: TUserMinimal,
    required: true
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
