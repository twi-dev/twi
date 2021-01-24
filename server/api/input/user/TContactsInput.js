import {GraphQLURL as TUrl} from "graphql-custom-types"
import {GraphQLString as TString} from "graphql"

import Input from "parasprite/Input"

const TContactsInput = Input("ContactsInput", "User contacts")
  .field({
    name: "vk",
    type: TString,
    description: "A link to VK profile"
  })
  .field({
    name: "fb",
    type: TString,
    description: "A link to Facebook profile"
  })
  .field({
    name: "twitter",
    type: TString,
    description: "A link to Twitter profile"
  })
  .field({
    name: "website",
    type: TUrl,
    description: "A personal home page at the Web."
  })
.end()

export default TContactsInput
