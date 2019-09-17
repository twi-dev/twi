import bind from "core/helper/graphql/normalizeParams"
import conn from "core/db/connection"

import Session from "model/Session"

const attributes = {exclude: ["password"]}

const refreshTokens = ({args, ctx}) => conn.transaction(async transaction => {
  const {client} = ctx.state

  const session = await Session.findByToken(args.refreshToken, {transaction})
  const user = await session.getUser({attributes, transaction})
  const tokens = await session.refresh({user, client}, {transaction})

  return user.update({lastVisited: tokens.accessToken.signed}, {transaction})
    .then(() => tokens)
})

export default refreshTokens |> bind
