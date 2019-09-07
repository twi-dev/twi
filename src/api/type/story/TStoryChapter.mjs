import {GraphQLString as TString, GraphQLInt as TInt} from "graphql"

import Type from "parasprite/Type"

import TStoryChapterContent from "api/type/story/TStoryChapterContent"
import content from "api/resolve/query/story/chapterContent"

const TStoryChapter = Type({
  name: "StoryChapter",
  description: "Represends information about chapter"
})
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
    name: "content",
    type: TStoryChapterContent,
    required: true,
    noArgs: true,
    handler: content
  })
.end()

export default TStoryChapter
