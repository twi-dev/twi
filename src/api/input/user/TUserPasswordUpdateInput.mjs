import {GraphQLString as TString} from "graphql"

import Type from "parasprite/Type"

const TUserPasswordUpdateInput = Type("UserPasswordUpdateInput")
  .field({
    name: "old",
    type: TString,
    required: true
  })
  .field({
    name: "new",
    type: TString,
    required: true
  })
.end()

export default TUserPasswordUpdateInput
