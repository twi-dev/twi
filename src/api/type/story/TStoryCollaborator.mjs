import {GraphQLString as TString} from "graphql"

import concat from "core/helper/string/concatFromArray"

import Type from "parasprite/Type"

import TUserMinimal from "../user/TUserMinimal"

const TStoryCollaborator = Type("StoryCollaborator", concat([
  // TODO: Improve this description :D
  "The story collaborator information. ",
  "Is that the user who helped a publisher with the story translation ",
  "or something else."
]))
  .field({name: "role", type: TString, required: true})
  .field({name: "user", type: TUserMinimal, required: true})
.end()

export default TStoryCollaborator
