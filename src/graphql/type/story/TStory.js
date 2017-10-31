import {
  GraphQLString as TString,
  GraphQLInt as TInt,
  GraphQLID as TID
} from "graphql"

import Type from "parasprite/Type"

import TChapter from "./TChapter"
import TStoryCollaborator from "./TStoryCollaborator"

import TDates from "../common/TDates"
import TPublisher from "../user/TPublisher"

import INode, {isTypeOf} from "../../interface/common/INode"

import findChaptersById from "../../resolve/query/story/findChaptersById"

const TStory = Type(
  "Story", "Represends available information about the stories",
  [INode], isTypeOf
)
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
    type: TPublisher,
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
  .resolve({
    name: "chapters",
    type: [TChapter, true],
    required: true,
    handler: findChaptersById
  })
    .arg("cursor", TInt)
  .end()
.end()

export default TStory
