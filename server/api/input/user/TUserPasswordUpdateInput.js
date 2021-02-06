import {
  GraphQLInputObjectType as Input,
  GraphQLNonNull as Required,
  GraphQLString as TString
} from "graphql"

const TUserPasswordUpdateInput = new Input({
  name: "UserPasswordUpdateInput",
  fields: {
    old: {
      type: new Required(TString)
    },
    new: {
      type: new Required(TString)
    }
  }
})

export default TUserPasswordUpdateInput
