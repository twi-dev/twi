import {GraphQLEmail as TEmail} from "graphql-custom-types"
import {GraphQLString as TString} from "graphql"

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
    description: "Registration email.",
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
  .resolve({
    name: "sessions",
    type: TAuthSessionPage,
    required: true,
    noArgs: true,
    handler: sessions
  })
.end()

export default TViewer
