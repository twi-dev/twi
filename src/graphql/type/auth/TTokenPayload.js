import {GraphQLString as TString} from "graphql"

import Type from "parasprite/Type"

const TTokenPayload = Type(
  "TokenPayload", "Resolves access_token and refresh_token"
)
  .field("access", TString, true)
  .field("refresh", TString, true)
.end()

export default TTokenPayload
