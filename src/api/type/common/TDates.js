import {GraphQLDateTime as TDateTime} from "graphql-iso-date"

import Type from "parasprite/Type"

import serialize from "lib/helper/graphql/serializeDate"

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
    description: "The date of last entity update."
  })
  .resolve({
    name: "deletedAt",
    type: TDateTime,
    noArgs: true,
    handler: serialize("deletedAt"),
    description: "The date entity's was removed."
  })
.end()

export default TDates
