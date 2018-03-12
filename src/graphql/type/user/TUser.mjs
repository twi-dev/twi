import {GraphQLInt as TInt} from "graphql"

import Type from "parasprite/Type"

import findUserStories from "graphql/resolve/query/story/findUserStories"

import TStoryMinimal from "../story/TStoryMinimal"

import TUserMinimal from "./TUserMinimal"

const TUser = Type({
  name: "User",
  description: "Represends a full user information",
  extends: TUserMinimal
})
  .resolve({
    name: "stories",
    type: [TStoryMinimal, true],
    description: "The stories, written by this user",
    handler: findUserStories
  })
    .arg({
      name: "cursor",
      type: TInt
    })
  .end()
.end()

export default TUser
