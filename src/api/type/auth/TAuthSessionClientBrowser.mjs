import {GraphQLString as TString} from "graphql"

import Type from "parasprite/Type"

const TAuthSessionClientBrowser = Type({
  name: "AuthSessionClientBrowser",
  description: "A minimal user's browser fingerprint."
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

export default TAuthSessionClientBrowser
