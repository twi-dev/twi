import {GraphQLString as TString} from "graphql"

import Input from "parasprite/Input"

const TUserPasswordUpdateInput = Input("UserPasswordUpdateInput")
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
