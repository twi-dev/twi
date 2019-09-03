import {GraphQLString as TString, GraphQLInt as TInt} from "graphql"

import Input from "parasprite/Input"

const TStoryUpdateInput = Input("StoryUpdateInput")
  .field({
    name: "id",
    type: TInt,
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
