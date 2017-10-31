import {GraphQLString as TString} from "graphql"
import {GraphQLDateTime as TDateTime} from "graphql-iso-date"

import Type from "parasprite/Type"

const TTokenPayload = Type(
  "TokenPayload", "Resolves accessToken and refreshToken"
)
  .field({
    name: "expiresIn",
    type: TDateTime,
    required: true
  })
  .field({
    name: "accessToken",
    type: TString,
    required: true
  })
  .field({
    name: "refreshToken",
    type: TString,
    required: true
  })
.end()

export default TTokenPayload
