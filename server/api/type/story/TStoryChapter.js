import {
  GraphQLObjectType as Output,
  GraphQLNonNull as Required,
  GraphQLString as TString,
  GraphQLInt as TInt
} from "graphql"

// eslint-disable-next-line max-len
import TStoryChapterContentTypes from "server/api/input/story/TStoryChapterContentTypes"

import content from "server/api/resolve/query/story/chapter/content"

const TStoryChapter = new Output({
  name: "StoryChapter",
  description: "Represends information about chapter",
  fields: {
    id: {
      type: new Required(TInt)
    },
    title: {
      type: new Required(TString)
    },
    content: {
      type: new Required(TString),
      resolve: content,
      args: {
        as: {
          type: TStoryChapterContentTypes,
          defaultValue: "markdown"
        }
      }
    }
  }
})

export default TStoryChapter
