import Type from "parasprite/Type"

import TAuthTokenMinimal from "./TAuthTokenMinimal"

const TAuthRefreshToken = Type({
  name: "AuthRefreshToken",
  description: "A long-term token used to refresh authorization "
    + "tokens pair within the current session.",
  extends: TAuthTokenMinimal
}).end()

export default TAuthRefreshToken
