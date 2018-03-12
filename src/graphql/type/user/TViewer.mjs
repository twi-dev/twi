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
    description: "Registration email.",
    required: true
  })
.end()

export default TViewer
