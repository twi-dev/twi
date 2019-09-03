import {GraphQLInt as TInt} from "graphql"

import Input from "parasprite/Input"

import TCollaboratorRolesInput from "api/input/story/TCollaboratorRolesInput"

const TCollaboratorInput = Input("CollaboratorInput")
  .field({
    name: "userId",
    type: TInt,
    required: true,
    description: "ID of an existent user to add to collaborators."
  })
  .field({
    name: "role",
    type: TCollaboratorRolesInput,
    description: "A role of the new story's collaborator."
  })
.end()

export default TCollaboratorInput
