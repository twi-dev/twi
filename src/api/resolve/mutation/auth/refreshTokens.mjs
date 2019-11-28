import bind from "lib/helper/graphql/normalizeParams"
import Unauthorized from "lib/error/http/Unauthorized"
import conn from "lib/db/connection"

import Session from "model/Session"
import User from "model/User"

const attributes = {exclude: ["password"]}
const include = [{model: User, as: "user", required: true, attributes}]

const refreshTokens = ({args, ctx}) => conn.transaction(async transaction => {
  const {client} = ctx.state
  const {refreshToken} = args

  const session = await Session.findByToken(refreshToken, {
    transaction, include
  })

  if (!session) {
    throw new Unauthorized(
      "Bad refreshToken signature: Check your credentials and try again."
    )
  }

  const tokens = await session.refresh({
    user: session.user, client
  }, {transaction})

  return session.user.update({
    lastVisited: tokens.accessToken.signed
  }, {transaction}).then(() => tokens)
})

export default refreshTokens |> bind
