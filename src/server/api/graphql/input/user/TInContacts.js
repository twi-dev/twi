import {GraphQLString as TString} from "graphql"
import Input from "parasprite/Input"

const TInContacts = Input("TInContacts", "User contacts")
  .field("vk", TString, "A link to VK profile")
  .field("fb", TString, "A link to Facebook profile")
  .field("twitter", TString, "A link to Twitter profile")
.end()

export default TInContacts
