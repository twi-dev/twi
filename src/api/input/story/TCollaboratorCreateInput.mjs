import {GraphQLInt as TInt} from "graphql"

import Input from "parasprite/Input"

import TCollaboratorInput from "api/input/story/TCollaboratorInput"

const TCollaboratorCreateInput = Input("CollaboratorCreateInput")
  .field({
    name: "id",
    type: TInt,
    required: true,
    description: "ID of an existent story to add the new collaborator."
  })
  .field({
    name: "collaborator",
    type: TCollaboratorInput,
    required: true,
    description: "A new collaborator to add to the story."
  })
.end()

export default TCollaboratorCreateInput
