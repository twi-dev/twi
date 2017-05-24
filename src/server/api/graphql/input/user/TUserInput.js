import {GraphQLString as TString} from "graphql"
import Input from "parasprite/Input"

import TLogin from "server/api/graphql/scalar/user/TLogin"
import TEmail from "server/api/graphql/scalar/user/TEmail"
import TFileInput from "../file/TFileInput"
import TContactsInput from "./TContactsInput"

const TUserInput = Input("TUserInput", "Basic user information.")
  .field("login", TLogin, "An unique human-readable user identifier.", true)

  // TODO: Replace this type with custom scalar TEmailInput type
  .field("email", TEmail, "An email address.", true)

  .field("password", TString, "User secured (or not :D) password.", true)
  .field("avatar", TFileInput, "User profile picture.")
  .field("contacts", TContactsInput, "User contact information.")
.end()

export default TUserInput
