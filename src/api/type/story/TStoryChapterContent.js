import {GraphQLString as TString} from "graphql"

import Type from "parasprite/Type"

const TStoryChapterContent = Type("StoryChapterContent")
  .field({
    name: "md",
    type: TString,
    required: true
  })
  .field({
    name: "html",
    type: TString,
    required: true
  })
.end()

export default TStoryChapterContent
