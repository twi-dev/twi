import {
  GraphQLInputObjectType as Input,
  GraphQLNonNull as Required,
  GraphQLString as TString
} from "graphql"

const TStoryChapterInput = new Input({
  name: "StoryChapterInput",
  fields: {
    title: {
      type: TString
    },
    content: {
      type: new Required(TString)
    }
  }
})

export default TStoryChapterInput
