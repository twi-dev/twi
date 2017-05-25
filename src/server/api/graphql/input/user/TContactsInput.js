import {GraphQLString as TString} from "graphql"
import {GraphQLURL as TURL} from "graphql-custom-types"
import Input from "parasprite/Input"

const TContactsInput = Input("ContactsInput", "User contacts")
  .field("vk", TString, "A link to VK profile")
  .field("fb", TString, "A link to Facebook profile")
  .field("twitter", TString, "A link to Twitter profile")
  .field("website", TURL, "A personal home page at the Web.")
.end()

export default TContactsInput
