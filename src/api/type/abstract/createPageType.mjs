import {GraphQLInt as TInt} from "graphql"

import Type from "parasprite/Type"

const rowsToList = ({rows: list}) => list

const createPageType = ListType => Type(`${ListType.name}Page`)
  .field({
    name: "count",
    type: TInt,
    required: true
  })
  .resolve({
    name: "list",
    type: [ListType],
    required: true,
    noArgs: true,
    handler: rowsToList
  })
.end()

export default createPageType
