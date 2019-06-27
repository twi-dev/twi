import {GraphQLDateTime as TDateTime} from "graphql-iso-date"

import Type from "parasprite/Type"

import serialize from "core/helper/graphql/serializeDate"

const TUserDates = Type("UserDates", "User activity and registration dates.")
  .resolve({
    name: "registeredAt",
    type: TDateTime,
    noArgs: true,
    handler: serialize("registeredAt"),
    description: "User registration time mark.",
    required: true
  })
  .resolve({
    name: "lastVisit",
    type: TDateTime,
    noArgs: true,
    handler: serialize("lastVisit"),
    description: "User last activity time mark."
  })
  .resolve({
    name: "updatedAt",
    type: TDateTime,
    noArgs: true,
    handler: serialize("updatedAt"),
    description: "User last activity time mark."
  })
.end()

export default TUserDates
