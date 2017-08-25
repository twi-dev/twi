import {GraphQLEmail as TEmail} from "graphql-custom-types"
import {GraphQLString as TString} from "graphql"

import Input from "parasprite/Input"

const TAuthInput = Input(
  "AuthInput", "User credentials for local authentication"
)
  .field("email", TEmail, true)
  .field("password", TString, true)
.end()

export default TAuthInput
