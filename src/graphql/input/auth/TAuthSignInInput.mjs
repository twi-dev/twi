import {GraphQLString as TString} from "graphql"

import Input from "parasprite/Input"

import TLogin from "../../scalar/user/TLogin"

const TAuthSignInInput = Input({
  name: "AuthSignInInput",
  description: "User credentials for local authentication"
})
  .field({name: "login", type: TLogin, required: true})
  .field({name: "password", type: TString, required: true})
.end()

export default TAuthSignInInput
