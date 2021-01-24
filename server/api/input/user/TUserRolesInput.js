import Enum from "parasprite/Enum"

const TUserRole = Enum("UserRole")
  .value("DEVELOPER", "developer")
  .value("MODERATOR", "moderator")
  .value("SUPPORT", "support")
  .value("ADMIN", "admin")
  .value("TECH", "TECH")
  .value("USER", "user")
.end()

export default TUserRole
