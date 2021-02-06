import {
  GraphQLInputObjectType as Input,
  GraphQLNonNull as Required,
  GraphQLInt as TInt
} from "graphql"

import TStoryChapterInput from "server/api/input/story/TStoryChapterInput"

const TStoryChapterCreateInput = new Input({
  name: "StoryChapterCreateInput",
  fields: {
    id: {
      type: new Required(TInt)
    },
    chapter: {
      type: new Required(TStoryChapterInput)
    }
  }
})

export default TStoryChapterCreateInput
