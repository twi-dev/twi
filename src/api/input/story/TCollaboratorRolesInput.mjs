import Enum from "parasprite/Enum"

const TCollaboratorRolesInput = Enum("CollaboratorRolesInput")
  .value("BETA", "beta")
  .value("PAINTER", "painter")
  .value("TRANSLATOR", "translator")
  .value("WRITER", "writer")
  .value("EDITOR", "editor")
.end()

export default TCollaboratorRolesInput
