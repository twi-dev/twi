import {GraphQLString as TString, GraphQLInt as TInt} from "graphql"

import Type from "parasprite/Type"

import TLogin from "api/scalar/user/TLogin"
import TUserDates from "api/type/user/TUserDates"
import TUserContacts from "api/type/user/TUserContacts"

import contacts from "api/resolve/query/user/contacts"
import status from "api/resolve/query/user/status"
import dates from "api/resolve/query/user/dates"
import role from "api/resolve/query/user/role"

const TUserMinimal = Type("UserMinimal", "The minimal User information.")
  .field({
    name: "id",
    type: TInt,
    description: "User unique identifer at the system",
    required: true
  })
  .field({
    name: "login",
    type: TLogin,
    description: "User login that represends his/her address",
    required: true
  })
  .resolve({
    name: "dates",
    type: TUserDates,
    description: "User registration dates",
    required: true,
    noArgs: true,
    handler: dates
  })
  .resolve({
    name: "role",
    type: TString,
    handler: role,
    description: "User role name",
    required: true,
    noArgs: true
  })
  .resolve({
    name: "status",
    type: TString,
    handler: status,
    description: "User accoutn status",
    required: true,
    noArgs: true
  })
  .field({
    name: "avatar",
    type: TString
  })
  .resolve({
    name: "contacts",
    type: TUserContacts,
    description: "User contact information.",
    noArgs: true,
    handler: contacts
  })
.end()

export default TUserMinimal
