import Type from "parasprite/Type"

import TAuthAccessToken from "./TAuthAccessToken"
import TAuthRefreshToken from "./TAuthRefreshToken"

const TAuthTokens = Type({
  name: "AuthTokens",
  description: "Resolves accessToken and refreshToken"
})
  .field({
    name: "accessToken",
    type: TAuthAccessToken,
    required: true
  })
  .field({
    name: "refreshToken",
    type: TAuthRefreshToken,
    required: true
  })
.end()

export default TAuthTokens
