import {GraphQLString as TString, GraphQLID as TID} from "graphql"
import {GraphQLDateTime as TDateTime} from "graphql-iso-date"
import Type from "parasprite/Type"

import TRole from "./TRole"

import TStory from "../story/TStory"

const TUser = Type("User", "Represends a full user information")
  .field("id", TID, true, "User unique identifer at the system")
  .field("login", TString, true, "User login that represends his/her address")
  .field("email", TString, true, "Represends a main email address")
  .field("registeredAt", TDateTime, "User registration data")
  .field("role", TRole, true, "Represends information about role")
  .field("stoies", [TStory], "The stories, written by this user")
.end()

export default TUser
