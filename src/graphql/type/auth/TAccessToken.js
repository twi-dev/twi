import {GraphQLDateTime as TDateTime} from "graphql-iso-date"
import {GraphQLString as TString} from "graphql"

import Type from "parasprite/Type"

const TAccessToken = Type(
  "AccessToken", "An access token with it expiration date"
)
  .field("payload", TString, true)
  .field("expiresIn", TDateTime, true)
.end()

export default TAccessToken
