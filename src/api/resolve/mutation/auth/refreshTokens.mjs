import bind from "core/helper/graphql/normalizeParams"
import Unauthorized from "core/error/http/Unauthorized"
import conn from "core/db/connection"

import Session from "model/Session"
import User from "model/User"

const attributes = {exclude: ["password"]}
const include = [{model: User, as: "user", required: true, attributes}]

const refreshTokens = ({args, ctx}) => conn.transaction(async transaction => {
  const {client, user: viewer} = ctx.state
  const {refreshToken} = args

  const session = await Session.findByToken(refreshToken, {
    transaction, include
  })

  if (!session || session.user.id !== viewer.id) {
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
