import {GraphQLInt as TInt} from "graphql"

import Type from "parasprite/Type"

import TDates from "api/type/common/TDates"
import TClient from "api/type/auth/TAuthSessionClient"

import client from "api/resolve/query/auth/client"
import dates from "api/resolve/query/common/dates"

const TAuthSession = Type({
  name: "AuthSession",
  description: "Information about current session"
})
  .field({
    name: "id",
    type: TInt,
    required: true
  })
  .resolve({
    name: "dates",
    type: TDates,
    required: true,
    noArgs: true,
    handler: dates
  })
  .resolve({
    name: "client",
    type: TClient,
    required: true,
    noArgs: true,
    handler: client
  })
.end()

export default TAuthSession
