import {GraphQLID as TID} from "graphql"

import Input from "parasprite/Input"

import TCollaboratorInput from "./TCollaboratorInput"

const TAddCollaboratorInput = Input("AddCollaboratorInput")
  .field({
    name: "id",
    type: [TID, true],
    description: "ID of an existent story to add the new collaborator."
  })
  .field({
    name: "collaborator",
    type: [TCollaboratorInput, true],
    description: "A new collaborator to add to the story."
  })
.end()

export default TAddCollaboratorInput
