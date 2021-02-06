import {GraphQLEnumType as Enum} from "graphql"

const TStoryChapterContentTypes = new Enum({
  name: "StoryChapterContentTypes",
  values: {
    markdown: {
      value: "markdown"
    },
    html: {
      value: "html"
    },
    text: {
      value: "text"
    }
  }
})

export default TStoryChapterContentTypes
