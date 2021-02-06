import {
  GraphQLInputObjectType as Input,
  GraphQLNonNull as Required,
  GraphQLInt as TInt,
  GraphQLString as TString,
  GraphQLList as List
} from "graphql"

import TFileInput from "server/api/input/common/TFileInput"
import TStoryChapterInput from "server/api/input/story/TStoryChapterInput"

const TStoryCreateInput = new Input({
  name: "StoryCreateInput",
  fields: {
    title: {
      type: new Required(TString)
    },
    description: {
      type: new Required(TString)
    },
    cover: {
      type: TFileInput
    },
    tags: {
      type: new List(new Required(TInt))
    },
    chapters: {
      type: new List(new Required(TStoryChapterInput))
    }
  }
})

export default TStoryCreateInput
