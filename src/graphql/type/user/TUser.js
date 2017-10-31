import {
  GraphQLID as TID,
  GraphQLInt as TInt,
  GraphQLString as TString
} from "graphql"
import Type from "parasprite/Type"

import findUserStories from "graphql/resolve/query/story/findUserStories"

import TUserDates from "./TUserDates"
import TUserContacts from "./TUserContacts"

import TStoryMinimal from "../story/TStoryMinimal"
import TLogin from "../../scalar/user/TLogin"

import INode, {isTypeOf} from "../../interface/common/INode"

const TUser = Type(
  "User", "Represends a full user information", [INode], isTypeOf
)
  .field({
    name: "id",
    type: TID,
    description: "User unique identifer at the system",
    required: true
  })
  .field({
    name: "login",
    type: TLogin,
    description: "User login that represends his/her address",
    required: true
  })
  .field({
    name: "dates",
    type: TUserDates,
    description: "User registration dates",
    required: true
  })
  .field({
    name: "role",
    type: TString,
    description: "User role name",
    required: true
  })
  .field({
    name: "status",
    type: TString,
    description: "User accoutn status",
    required: true
  })
  .field({
    name: "contacts",
    type: TUserContacts,
    description: "User contact information."
  })
  .resolve({
    name: "stories",
    type: [TStoryMinimal, true],
    description: "The stories, written by this user",
    handler: findUserStories
  })
    .arg("cursor", TInt)
  .end()
.end()

export default TUser
