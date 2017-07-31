import {GraphQLString as TString} from "graphql"
import {GraphQLEmail as TEmail} from "graphql-custom-types"
import Type from "parasprite/Type"

const TContacts = Type("Contacts", "Information about user contacts")
  .field("email", TEmail)
  .field("vk", TString)
  .field("fb", TString)
  .field("twitter", TString)
.end()

export default TContacts
