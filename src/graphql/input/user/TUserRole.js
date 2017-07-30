import Enum from "parasprite/Enum"

const TUserRole = Enum("UserRole")
  .value("ADMIN", "admin")
  .value("MODERATOR", "moderator")
  .value("REGULAR", "regular")
.end()

export default TUserRole
