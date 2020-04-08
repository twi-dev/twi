import {GraphQLInt as TInt, GraphQLString as TString} from "graphql"

import Input from "parasprite/Input"

const TStoryTagsAdd = Input("StoryTagsAdd")
  .field({
    name: "id",
    type: TInt,
    required: true
  })
  .field({
    name: "tags",
    type: [TString, true],
    required: true
  })
.end()

export default TStoryTagsAdd
