import {
  GraphQLInt as TInt,
  GraphQLString as TString,
  GraphQLBoolean as TBoolean
} from "graphql"

import Type from "parasprite/Type"

import TUser from "server/api/type/user/TUser"
import TDates from "server/api/type/common/TDates"
import TStoryTagPage from "server/api/type/story/TStoryTagPage"

import publisher from "server/api/resolve/query/story/publisher"
import tags from "server/api/resolve/query/story/storyTags"
import dates from "server/api/resolve/query/common/dates"

const TStoryRemoved = Type("StoryRemoved")
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
  .resolve({
    name: "publisher",
    type: TUser,
    handler: publisher,
    required: true,
    noArgs: true
  })
  .resolve({
    name: "tags",
    type: TStoryTagPage,
    noArgs: true,
    required: true,
    handler: tags
  })
  .field({
    name: "isRemoved",
    type: TBoolean,
    required: true
  })
.end()

export default TStoryRemoved
