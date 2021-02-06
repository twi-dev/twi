import {
  GraphQLInputObjectType as Input,
  GraphQLNonNull as Required,
  GraphQLString as TString
} from "graphql"

const TFileInput = new Input({
  name: "FileInput",
  description: "Represends a file shape taken from multipart middleware.",
  fields: {
    filename: {
      type: new Required(TString)
    },
    path: {
      type: new Required(TString)
    },
    mime: {
      type: new Required(TString)
    },
    enc: {
      type: new Required(TString)
    }
  }
})

export default TFileInput
