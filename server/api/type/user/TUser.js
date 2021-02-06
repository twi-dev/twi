import {GraphQLInt as TInt} from "graphql"

import Type from "parasprite/Type"

import TFile from "server/api/type/common/TFile"
import TLogin from "server/api/scalar/user/TLogin"
import TUserDates from "server/api/type/user/TUserDates"

import dates from "server/api/resolve/query/user/dates"

const TUser = Type("User", "The user's public information.")
  .field({
    name: "id",
    type: TInt,
    description: "User's numeric unique identifer.",
    required: true
  })
  .field({
    name: "login",
    type: TLogin,
    description: "The login represends their page address.",
    required: true
  })
  .resolve({
    name: "dates",
    type: TUserDates,
    description: "User's registration dates",
    required: true,
    noArgs: true,
    handler: dates
  })
  .field({
    name: "avatar",
    type: TFile,
    description: "User's profile page"
  })
.end()

export default TUser
