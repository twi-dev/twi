import {GraphQLString as TString, GraphQLID as TID} from "graphql"

import Type from "parasprite/Type"

import concat from "core/helper/string/concatFromArray"

import TDates from "../common/TDates"

import INode, {isTypeOf} from "../../interface/common/INode"

import TPublisher from "../user/TPublisher"

const typeDescription = concat([
  "Minimal information about the story. ",
  "Such as the story name and authors. ",
  "No chapters information would be received from this type."
])

const TStoryMinimal = Type("StoryMinimal", typeDescription, [INode], isTypeOf)
  .field("id", TID, true)
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
    type: TPublisher,
    required: true
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
