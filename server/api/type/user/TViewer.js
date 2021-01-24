import {
  GraphQLObjectType as Output,
  GraphQLString as TString,
  GraphQLNonNull as Required
} from "graphql"
import {GraphQLEmail as TEmail} from "graphql-custom-types"

import Type from "parasprite/Type"

import sessions from "api/resolve/query/auth/sessions"
import TAuthSessionPage from "api/type/auth/TAuthSessionPage"

import TUser from "./TUser"

const TViewer = Type({
  name: "Viewer",
  description: "The logged-in user information.",
  extends: TUser
})
  .field({
    name: "email",
    type: TEmail,
    description: "Registration email (private).",
    required: true
  })
  .field({
    name: "role",
    type: TString,
    description: "User'a role name",
    required: true
  })
  .field({
    name: "status",
    type: TString,
    description: "User's accout status",
    required: true
  })
  .resolve({
    name: "sessions",
    type: TAuthSessionPage,
    required: true,
    noArgs: true,
    handler: sessions,
    description: "User's active sessions list."
  })
.end()

export default TViewer
