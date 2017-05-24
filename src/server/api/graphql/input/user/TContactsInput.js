import {GraphQLString as TString} from "graphql"
import Input from "parasprite/Input"

import TURL from "server/api/graphql/scalar/common/TURL"

const TContactsInput = Input("TContactsInput", "User contacts")
  .field("vk", TString, "A link to VK profile")
  .field("fb", TString, "A link to Facebook profile")
  .field("twitter", TString, "A link to Twitter profile")
  .field("website", TURL, "A personal home page at the Web.")
.end()

export default TContactsInput
