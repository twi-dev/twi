import {
  GraphQLInputObjectType as Input,
  GraphQLNonNull as Required,
  GraphQLInt as TInt,
  GraphQLString as TString
} from "graphql"

const TStoryUpdateInput = new Input({
  name: "StoryUpdateInput",
  fields: {
    id: {
      type: new Required(TInt)
    },
    title: {
      type: TString
    },
    description: {
      type: TString
    }
  }
})

export default TStoryUpdateInput
