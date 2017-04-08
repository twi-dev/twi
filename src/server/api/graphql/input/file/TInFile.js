import {GraphQLString as TString} from "graphql"
import {Input} from "parasprite"

const TInFile = Input(
  "TInFile", "Represends a file type for multipart resolvers"
)
  .field("originalName", TString, true)
  .field("path", TString, true)
  .field("mime", TString, true)
  .field("enc", TString, true)
.end()

export default TInFile
