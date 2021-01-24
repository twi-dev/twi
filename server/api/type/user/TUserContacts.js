import {GraphQLEmail as TEmail} from "graphql-custom-types"
import {GraphQLString as TString} from "graphql"

import Type from "parasprite/Type"

const TUserContacts = Type("UserContacts", "Information about user contacts")
  .field({
    name: "vk",
    type: TString
  })
  .field({
    name: "fb",
    type: TString
  })
  .field({
    name: "twitter",
    type: TString
  })
  .field({
    name: "email",
    type: TEmail
  })
  .field({
    name: "website",
    type: TString
  })
.end()

export default TUserContacts
