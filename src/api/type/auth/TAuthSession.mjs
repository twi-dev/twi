import {GraphQLID as TID} from "graphql"

import Type from "parasprite/Type"

import TDates from "api/type/common/TDates"
import TClient from "api/type/auth/TAuthSessionClient"

import client from "api/resolve/query/auth/client"

const TAuthSession = Type({
  name: "AuthSession",
  description: "Information about current session"
})
  .field({
    name: "id",
    type: TID,
    required: true
  })
  .field({
    name: "dates",
    type: TDates,
    required: true
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
