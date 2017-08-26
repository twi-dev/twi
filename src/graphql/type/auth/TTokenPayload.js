import {GraphQLString as TString} from "graphql"

import Type from "parasprite/Type"

const TTokenPayload = Type(
  "TokenPayload", "Resolves accessToken and refreshToken"
)
  .field("accessToken", TString, true)
  .field("refreshToken", TString, true)
.end()

export default TTokenPayload
