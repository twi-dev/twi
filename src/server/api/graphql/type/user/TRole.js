import {
  GraphQLString as TString,
  GraphQLInt as TInt
} from "graphql"
import {Type} from "parasprite"

const TRole = Type("TRole", "Represends user role information")
  .field("name", TString, true, "Human-readable role name")
  .field("code", TInt, true, "Role numeric code")
.end()

export default TRole
