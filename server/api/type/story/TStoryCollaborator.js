import {GraphQLInt as TInt, GraphQLString as TString} from "graphql"

import Type from "parasprite/Type"

import TUser from "api/type/user/TUser"

const TStoryCollaborator = Type({
  name: "StoryCollaborator",
  description: "The story collaborator information. "
})
  .field({name: "id", type: TInt, required: true})
  .field({name: "role", type: TString, required: true})
  .field({name: "user", type: TUser, required: true})
.end()

export default TStoryCollaborator
