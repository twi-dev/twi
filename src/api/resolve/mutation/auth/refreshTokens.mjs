import bind from "core/helper/graphql/normalizeParams"

import Session from "model/Session"

async function refreshTokens({args, ctx}) {
  const session = await Session.findByToken(args.refreshToken)
  const user = await session.getUser({attributes: {exclude: ["password"]}})
  const tokens = await session.refresh({user, client: ctx.state.client})

  return user.update({lastVisit: tokens.accessToken.signed})
    .then(() => tokens)
}

export default refreshTokens |> bind
