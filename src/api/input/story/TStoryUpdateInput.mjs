import {GraphQLString as TString} from "graphql"

import Input from "parasprite/Input"

import TObjectID from "api/scalar/common/TObjectID"

const TStoryUpdateInput = Input("StoryUpdateInput")
  .field({
    name: "id",
    type: TObjectID,
    required: true
  })
  .field({
    name: "title",
    type: TString
  })
  .field({
    name: "description",
    type: TString
  })
.end()

export default TStoryUpdateInput
