import {GraphQLString as TString} from "graphql"

import Input from "parasprite/Input"

const TStoryChapterUpdateInput = Input("StoryChapterUpdateInput")
  .field({
    name: "title",
    type: TString
  })
  .field({
    name: "content",
    type: TString
  })
.end()

export default TStoryChapterUpdateInput
