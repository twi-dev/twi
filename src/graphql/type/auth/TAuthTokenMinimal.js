import {GraphQLString as TString} from "graphql"

import Type from "parasprite/Type"

const TAuthTokenMinimal = Type("TAuthTokenMinimal")
  .field({
    name: "type",
    type: TString,
    required: true
  })
  .field({
    name: "payload",
    type: TString,
    required: true
  })
.end()

export default TAuthTokenMinimal
