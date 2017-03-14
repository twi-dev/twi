import {
  GraphQLString as TString,
  GraphQLID as TID
} from "graphql"
import {Type} from "parasprite"

import TRole from "./TRole"

const TUser = Type("TUser", "Represends a full user information")
  .field("userId", TID, true, "User unique identifer at the system")
  .field("login", TString, true, "User login that represends his/her address")
  .field("email", TString, true, "Represends a main email address")
  .field("gender", TString)
  .field("registeredAt", TString, "User registration data")
  .field("role", TRole, true, "Represends information about role")
.end()

export default TUser
