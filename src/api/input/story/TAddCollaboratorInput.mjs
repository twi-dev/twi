import Input from "parasprite/Input"

import TObjectID from "api/scalar/common/TObjectID"
import TCollaboratorInput from "api/input/story/TCollaboratorInput"

const TAddCollaboratorInput = Input("AddCollaboratorInput")
  .field({
    name: "id",
    type: TObjectID,
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

export default TAddCollaboratorInput
