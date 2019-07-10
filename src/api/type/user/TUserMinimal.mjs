import {GraphQLString as TString} from "graphql"

import Type from "parasprite/Type"

import TLogin from "api/scalar/user/TLogin"
import TUserDates from "api/type/user/TUserDates"
import TUserContacts from "api/type/user/TUserContacts"
import TObjectID from "api/scalar/common/TObjectID"

import status from "api/resolve/query/user/status"
import role from "api/resolve/query/user/role"

const TUserMinimal = Type("UserMinimal", "The minimal User information.")
  .field({
    name: "id",
    type: TObjectID,
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
  .field({
    name: "contacts",
    type: TUserContacts,
    description: "User contact information."
  })
.end()

export default TUserMinimal
