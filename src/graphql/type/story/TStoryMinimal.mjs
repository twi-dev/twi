import {GraphQLString as TString, GraphQLID as TID} from "graphql"

import Type from "parasprite/Type"

import concat from "core/helper/string/concatFromArray"

import TDates from "../common/TDates"

import TUserMinimal from "../user/TUserMinimal"

import TStoryCollaborator from "./TStoryCollaborator"

const typeDescription = concat([
  "Minimal information about the story. ",
  "Such as the story name and authors. ",
  "No chapters information would be received from this type."
])

const TStoryMinimal = Type("StoryMinimal", typeDescription)
  .field({
    name: "id",
    type: TID,
    required: true
  })
  .field({
    name: "title",
    type: TString,
    required: true
  })
  .field({
    name: "description",
    type: TString,
    required: true
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
    type: TString,
    required: true
  })
  .field({
    name: "dates",
    type: TDates,
    required: true
  })
.end()

export default TStoryMinimal
