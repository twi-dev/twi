import {GraphQLString as TString} from "graphql"
import Input from "parasprite/Input"

const TFileInput = Input({
  name: "FileInput",
  description: "Represends a file type for multipart resolvers."
})
  .field({
    name: "filrname",
    type: TString,
    required: true
  })
  .field({
    name: "path",
    type: TString,
    required: true
  })
  .field({
    name: "mime",
    type: TString,
    required: true
  })
  .field({
    name: "enc",
    type: TString,
    required: true
  })
.end()

export default TFileInput
