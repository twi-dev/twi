import Enum from "parasprite/Enum"

const TCollaboratorRolesInput = Enum("CollaboratorRolesInput")
  .value("WRITE", "write")
  .value("EDIT", "edit")
  .value("TRANSLATE", "translate")
  .value("ART", "art")
.end()

export default TCollaboratorRolesInput
