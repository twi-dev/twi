import {GraphQLString as TString} from "graphql"
import {GraphQLEmail as TEmail} from "graphql-custom-types"

import Type from "parasprite/Type"

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
.end()

export default TViewer
