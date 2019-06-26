import {GraphQLID as TID} from "graphql"

import Input from "parasprite/Input"

import TCollaboratorRolesInput from "./TCollaboratorRolesInput"

const TCollaboratorInput = Input("CollaboratorInput")
  .field({
    name: "userID",
    type: [TID, true],
    description: "ID of an existent user to add to collaborators."
  })
  .field({
    name: "role",
    type: [TCollaboratorRolesInput, true],
    description: "A role of the new story's collaborator."
  })
.end()

export default TCollaboratorInput
