import bind from "core/graphql/bindResolver"

import Session from "db/model/Session"
import User from "db/model/User"

async function refreshAccessToken({args, ctx}) {
  const session = await Session.findByToken(args.refreshToken)
  const tokens = await session.refresh({client: ctx.state.client})

  return User.findById(session.userId)
    .update({$set: {"dates.lastVisit": tokens.accessToken.signed}})
    .then(() => tokens)
}

export default bind(refreshAccessToken)
