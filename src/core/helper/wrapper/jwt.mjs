import jsonwebtoken from "jsonwebtoken"
import promisify from "@octetstream/promisify"

const jwt = promisify.except(
  jsonwebtoken,
  ["JsonWebTokenError", "NotBeforeError", "TokenExpiredError"],
  jsonwebtoken
)

export const decode = jwt.decode
export const verify = jwt.verify
export const sign = jwt.sign
export const JsonWebTokenError = jwt.JsonWebTokenError
export const NotBeforeError = jwt.NotBeforeError
export const TokenExpiredError = jwt.TokenExpiredError
export default jwt
