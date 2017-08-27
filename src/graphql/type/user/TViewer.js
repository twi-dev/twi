import {GraphQLID as TID, GraphQLString as TString} from "graphql"
import {GraphQLEmail as TEmail} from "graphql-custom-types"

import Type from "parasprite/Type"

import TUserDates from "./TUserDates"
import TUserContacts from "./TUserContacts"

import TLogin from "../../scalar/user/TLogin"

import INode, {isTypeOf} from "../../interface/common/INode"

const TUser = Type(
  "Viewer", "Represends a full user information", [INode], isTypeOf
)
  .field("id", TID, "User unique identifer at the system", true)
  .field("email", TEmail, "Registration email", true)
  .field("login", TLogin, "User login that represends his/her address", true)
  .field("dates", TUserDates, "User registration dates", true)
  .field("role", TString, "User role name", true)
  .field("status", TString, "User accoutn status", true)
  .field("contacts", TUserContacts, "User contact information.")
.end()

export default TUser
