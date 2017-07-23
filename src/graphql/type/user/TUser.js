import {GraphQLID as TID, GraphQLInt as TInt} from "graphql"
import {GraphQLDateTime as TDateTime} from "graphql-iso-date"
import {GraphQLEmail as TEmail} from "graphql-custom-types"
import Type from "parasprite/Type"

import getUserStories from "graphql/resolve/query/story/getUserStories"

import TRole from "./TRole"

import TStory from "../story/TStory"
import TLogin from "../../scalar/user/TLogin"

const TUser = Type("User", "Represends a full user information")
  .field("id", TID, true, "User unique identifer at the system")
  .field("login", TLogin, true, "User login that represends his/her address")
  .field("email", TEmail, true, "Represends a main email address")
  .field("registeredAt", TDateTime, "User registration data")
  .field("role", TRole, true, "Represends information about role")
  .resolve(
    "stories", [TStory], "The stories, written by this user", getUserStories
  )
    .arg("cursor", TInt)
  .end()
.end()

export default TUser
