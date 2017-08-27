import {GraphQLString as TString} from "graphql"
import {GraphQLDateTime as TDateTime} from "graphql-iso-date"

import Type from "parasprite/Type"

const TTokenPayload = Type(
  "TokenPayload", "Resolves accessToken and refreshToken"
)
  .field("expiresIn", TDateTime, true)
  .field("accessToken", TString, true)
  .field("refreshToken", TString, true)
.end()

export default TTokenPayload
