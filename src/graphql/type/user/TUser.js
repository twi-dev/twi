import {
  GraphQLID as TID,
  GraphQLInt as TInt,
  GraphQLString as TString
} from "graphql"
import Type from "parasprite/Type"

import findUserStories from "graphql/resolve/query/story/findUserStories"

import TUserDates from "./TUserDates"
import TUserContacts from "./TUserContacts"

import TStory from "../story/TStory"
import TLogin from "../../scalar/user/TLogin"

const TUser = Type("User", "Represends a full user information")
  .field("id", TID, "User unique identifer at the system", true)
  .field("login", TLogin, "User login that represends his/her address", true)
  .field("dates", TUserDates, "User registration dates", true)
  .field("role", TString, "User role name", true)
  .field("contacts", TUserContacts, "User contact information.")
  .resolve(
    "stories", [TStory], "The stories, written by this user", findUserStories
  )
    .arg("cursor", TInt)
  .end()
.end()

export default TUser
