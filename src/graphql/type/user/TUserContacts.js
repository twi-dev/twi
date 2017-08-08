import {GraphQLString as TString} from "graphql"
import {GraphQLEmail as TEmail} from "graphql-custom-types"
import Type from "parasprite/Type"

const TUserContacts = Type("UserContacts", "Information about user contacts")
  .field("vk", TString)
  .field("fb", TString)
  .field("twitter", TString)
  .field("email", TEmail)
.end()

export default TUserContacts
