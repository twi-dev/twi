import {GraphQLString as TString} from "graphql"

import Type from "parasprite/Type"

import TClientBrowser from "api/type/auth/TAuthSessionClientBrowser"
import TClientOS from "api/type/auth/TAuthSessionClientOS"

const TAuthSessionClient = Type({
  name: "AuthSessionClient",
  description: "A minimal user's client fingerprint."
})
  .field({
    name: "ip",
    type: TString,
    required: true,
    description: "IP address assigned to current session"
  })
  .field({
    name: "browser",
    type: TClientBrowser,
    required: true
  })
  .field({
    name: "os",
    type: TClientOS,
    required: true
  })
.end()

export default TAuthSessionClient
