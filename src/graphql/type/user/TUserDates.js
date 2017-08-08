import {GraphQLDateTime as TDateTime} from "graphql-iso-date"

import Type from "parasprite/Type"

const TUserDates = Type("UserDates", "User activity and registration dates.")
  .field("registeredAt", TDateTime, "User registration time mark.", true)
  .field("lastVisit", TDateTime, "User last activity time mark.")
.end()

export default TUserDates
