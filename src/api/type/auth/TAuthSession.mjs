import {GraphQLID as TID} from "graphql"

import Type from "parasprite/Type"

import TDates from "api/type/common/TDates"
import TClient from "api/type/auth/TAuthSessionClient"

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
  .field({
    name: "client",
    type: TClient,
    required: true
  })
.end()

export default TAuthSession
