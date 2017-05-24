import {GraphQLString as TString} from "graphql"
import Input from "parasprite/Input"

const TContactsInput = Input("TContactsInput", "User contacts")
  .field("vk", TString, "A link to VK profile")
  .field("fb", TString, "A link to Facebook profile")
  .field("twitter", TString, "A link to Twitter profile")
.end()

export default TContactsInput
