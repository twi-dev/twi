import {
  GraphQLInt as TInt,
  GraphQLString as TString,
  GraphQLBoolean as TBoolean
} from "graphql"

import Type from "parasprite/Type"

import TDates from "api/type/common/TDates"

import dates from "api/resolve/query/common/dates"

const TStoryChapterRemoved = Type("StoryChapterRemoved")
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
  .resolve({
    name: "dates",
    type: TDates,
    required: true,
    noArgs: true,
    handler: dates
  })
  .field({
    name: "isRemoved",
    type: TBoolean,
    required: true
  })
.end()

export default TStoryChapterRemoved
