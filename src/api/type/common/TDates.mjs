import {GraphQLDateTime as TDateTime} from "graphql-iso-date"

import Type from "parasprite/Type"

import serialize from "core/helper/graphql/serializeDate"

const TDates = Type("Dates")
  .resolve({
    name: "createdAt",
    type: TDateTime,
    noArgs: true,
    required: true,
    handler: serialize("createdAt"),
    description: "The date when story has been created."
  })
  .resolve({
    name: "updatedAt",
    type: TDateTime,
    noArgs: true,
    handler: serialize("updatedAt"),
    description: "The date of last story update."
  })
.end()

export default TDates
