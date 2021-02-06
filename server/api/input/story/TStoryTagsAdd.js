import {
  GraphQLInputObjectType as Input,
  GraphQLNonNull as Required,
  GraphQLInt as TInt,
  GraphQLList as List
} from "graphql"

const TStoryTagsAdd = new Input({
  name: "StoryTagsAdd",
  fields: {
    id: {
      type: new Required(TInt),
      description: "Story ID"
    },
    tags: {
      type: new List(new Required(TInt)),
      description: "A list of IDs of tags to add"
    }
  }
})

export default TStoryTagsAdd
