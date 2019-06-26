import {GraphQLDateTime as TDateTime} from "graphql-iso-date"

import Type from "parasprite/Type"

const TUserDates = Type("UserDates", "User activity and registration dates.")
  .field({
    name: "registeredAt",
    type: TDateTime,
    description: "User registration time mark.",
    required: true
  })
  .field({
    name: "lastVisit",
    type: TDateTime,
    description: "User last activity time mark."
  })
.end()

export default TUserDates
