import {GraphQLString as TString} from "graphql"

import Input from "parasprite/Input"

const TAuthLogInInput = Input({
  name: "AuthLogInInput",
  description: "User credentials for local authentication"
})
  .field({name: "username", type: TString, required: true})
  .field({name: "password", type: TString, required: true})
.end()

export default TAuthLogInInput
