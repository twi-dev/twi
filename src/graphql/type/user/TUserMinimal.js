import {GraphQLID as TID, GraphQLString as TString} from "graphql"

import Type from "parasprite/Type"

import TUserDates from "./TUserDates"
import TUserContacts from "./TUserContacts"

import TLogin from "../../scalar/user/TLogin"

const TUserMinimal = Type("UserMinimal", "The minimal User information.")
  .field({
    name: "id",
    type: TID,
    description: "User unique identifer at the system",
    required: true
  })
  .field({
    name: "login",
    type: TLogin,
    description: "User login that represends his/her address",
    required: true
  })
  .field({
    name: "dates",
    type: TUserDates,
    description: "User registration dates",
    required: true
  })
  .field({
    name: "role",
    type: TString,
    description: "User role name",
    required: true
  })
  .field({
    name: "status",
    type: TString,
    description: "User accoutn status",
    required: true
  })
  .field({
    name: "contacts",
    type: TUserContacts,
    description: "User contact information."
  })
.end()

export default TUserMinimal
