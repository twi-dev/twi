import Enum from "parasprite/Enum"

const TUserRole = Enum("UserRole")
  .value("ADMIN", "admin")
  .value("MODERATOR", "moderator")
  .value("USER", "user")
.end()

export default TUserRole
