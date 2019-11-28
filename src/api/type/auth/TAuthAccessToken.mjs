import {GraphQLDateTime as TDateTime} from "graphql-iso-date"

import Type from "parasprite/Type"

import serialize from "lib/helper/graphql/serializeDate"

import TAuthTokenMinimal from "./TAuthTokenMinimal"

const TAuthAccessToken = Type({
  name: "AuthAccessToken",
  description: "An access token with it expiration date",
  extends: TAuthTokenMinimal
})
  .resolve({
    name: "expires",
    type: TDateTime,
    required: true,
    noArgs: true,
    handler: serialize("expires")
  })
.end()

export default TAuthAccessToken
