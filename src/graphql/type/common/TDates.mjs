import {GraphQLDateTime as TDateTime} from "graphql-iso-date"

import Type from "parasprite/Type"

const TDates = Type("Dates")
  .field({
    name: "createdAt",
    type: TDateTime,
    description: "The date when story has been created.",
    required: true
  })
  .field({
    name: "updatedAt",
    type: TDateTime,
    description: "The date of last story update."
  })
.end()

export default TDates
