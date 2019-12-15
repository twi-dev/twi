import {GraphQLDateTime as TDateTime} from "graphql-iso-date"

import Type from "parasprite/Type"

import serialize from "lib/helper/graphql/serializeDate"

const TUserDates = Type("UserDates", "User activity and registration dates.")
  .resolve({
    name: "registeredAt",
    type: TDateTime,
    noArgs: true,
    handler: serialize("registeredAt"),
    description: "User's registration date and time.",
    required: true
  })
  .resolve({
    name: "lastVisited",
    type: TDateTime,
    noArgs: true,
    handler: serialize("lastVisited"),
    description: "User's last activity date and time."
  })
  .resolve({
    name: "updatedAt",
    type: TDateTime,
    noArgs: true,
    handler: serialize("updatedAt"),
    description: "The date and time of the last user's account update."
  })
.end()

export default TUserDates
