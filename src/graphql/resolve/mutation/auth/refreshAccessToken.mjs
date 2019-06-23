import bind from "core/graphql/bindResolver"

import Session from "db/model/Session"
import User from "db/model/User"

async function refreshAccessToken({args, ctx}) {
  const session = await Session.findByToken(args.refreshToken)
  const accessToken = await session.refresh({client: ctx.state.client})

  return User.findById(session.userId)
    .update({$set: {"dates.lastVisit": accessToken.signed}})
    .then(() => accessToken)
}

export default bind(refreshAccessToken)
