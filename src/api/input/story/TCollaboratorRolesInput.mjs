import Enum from "parasprite/Enum"

const TCollaboratorRolesInput = Enum("CollaboratorRolesInput")
  .value("TRANSLATE", "translate")
  .value("WRITE", "write")
  .value("EDIT", "edit")
  .value("ART", "art")
.end()

export default TCollaboratorRolesInput
