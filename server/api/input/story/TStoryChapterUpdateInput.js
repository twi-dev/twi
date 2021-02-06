import {
  GraphQLInputObjectType as Input,
  GraphQLNonNull as Required,
  GraphQLInt as TInt,
  GraphQLString as TString
} from "graphql"

const TStoryChapterUpdateInput = new Input({
  name: "StoryChapterUpdateInput",
  fields: {
    id: {
      type: new Required(TInt)
    },
    title: {
      type: TString
    },
    content: {
      type: TString
    }
  }
})

export default TStoryChapterUpdateInput
