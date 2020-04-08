import {GraphQLString as TString} from "graphql"

import Type from "parasprite/Type"

const TAuthSessionClientOS = Type({
  name: "AuthSessionClientOS",
  description: "A minimal user's OS fingerprint."
})
  .field({
    name: "name",
    type: TString,
    required: true
  })
  .field({
    name: "version",
    type: TString,
    required: true
  })
.end()

export default TAuthSessionClientOS
