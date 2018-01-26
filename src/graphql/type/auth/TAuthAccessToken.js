import {GraphQLDateTime as TDateTime} from "graphql-iso-date"

import Type from "parasprite/Type"

import TAuthTokenMinimal from "./TAuthTokenMinimal"

const TAuthAccessToken = Type({
  name: "AuthAccessToken",
  description: "An access token with it expiration date",
  extends: TAuthTokenMinimal
})
  .field({
    name: "expiresIn",
    type: TDateTime,
    required: true
  })
.end()

export default TAuthAccessToken
