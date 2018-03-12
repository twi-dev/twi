import Type from "parasprite/Type"

import TAuthTokenMinimal from "./TAuthTokenMinimal"

const TAuthRefreshToken = Type({
  name: "AuthRefreshToken",
  description: "An access token with it expiration date",
  extends: TAuthTokenMinimal
}).end()

export default TAuthRefreshToken
