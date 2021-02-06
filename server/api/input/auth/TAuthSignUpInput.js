import {GraphQLEmail as TEmail} from "graphql-custom-types"
import {GraphQLString as TString} from "graphql"

import Input from "parasprite/Input"

import TLogin from "server/api/scalar/user/TLogin"
import TFileInput from "server/api/input/common/TFileInput"
import TContactsInput from "server/api/input/user/TContactsInput"

const TAuthSignUpInput = Input("AuthSignUpInput", "Basic user information.")
  .field({
    name: "login",
    type: TLogin,
    description: "An unique human-readable user identifier.",
    required: true
  })
  .field({
    name: "email",
    type: TEmail,
    description: "An email address.",
    required: true
  })
  .field({
    name: "password",
    type: TString,
    description: "User's password.",
    required: true
  })
  .field({
    name: "avatar",
    type: TFileInput,
    description: "User's profile picture."
  })
  .field({
    name: "contacts",
    type: TContactsInput,
    description: "User's contact information."
  })
.end()

export default TAuthSignUpInput
