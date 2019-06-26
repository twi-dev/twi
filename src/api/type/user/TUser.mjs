import Type from "parasprite/Type"

import TUserMinimal from "./TUserMinimal"

const TUser = Type({
  name: "User",
  description: "Represends a full user information",
  extends: TUserMinimal
})
.end()

export default TUser
