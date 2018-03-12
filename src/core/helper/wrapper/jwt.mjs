import jsonwebtoken from "jsonwebtoken"
import promisify from "@octetstream/promisify"

const jwt = promisify.except(
  jsonwebtoken,
  ["JsonWebTokenError", "NotBeforeError", "TokenExpiredError"],
  jsonwebtoken
)

module.exports = {
  ...jsonwebtoken, ...jwt,
}
