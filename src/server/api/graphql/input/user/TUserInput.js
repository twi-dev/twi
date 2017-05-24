import {GraphQLString as TString} from "graphql"
import Input from "parasprite/Input"

import TContactsInput from "./TContactsInput"

const TUserInput = Input("TUserInput", "Basic user information.")
  .field("login", TString, "An unique human-readable user identifier.", true)

  // TODO: Replace this type with custom scalar TEmailInput type
  .field("email", TString, "An email address.", true)

  .field("password", TString, "User secured (or not :D) password.", true)
  .field("contacts", TContactsInput, "User contact information.")
.end()

export default TUserInput
