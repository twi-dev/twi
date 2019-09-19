import {GraphQLInt as TInt} from "graphql"

import Type from "parasprite/Type"

import TFile from "api/type/common/TFile"
import TLogin from "api/scalar/user/TLogin"
import TUserDates from "api/type/user/TUserDates"
import TUserContacts from "api/type/user/TUserContacts"

import contacts from "api/resolve/query/user/contacts"
import dates from "api/resolve/query/user/dates"

const TUser = Type("User", "The user's public information.")
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
  .field({
    name: "avatar",
    type: TFile
  })
  .resolve({
    name: "contacts",
    type: TUserContacts,
    description: "User contact information.",
    noArgs: true,
    handler: contacts
  })
.end()

export default TUser
