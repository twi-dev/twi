import bind from "core/helper/graphql/bindResolver"

import Session from "db/model/Session"
import User from "db/model/User"

async function refreshTokens({args, ctx}) {
  const session = await Session.findByToken(args.refreshToken)
  const user = await User.findById(session.userId).select("role status")
  const tokens = await session.refresh({user, client: ctx.state.client})

  return user.update({$set: {"dates.lastVisit": tokens.accessToken.signed}})
    .then(() => tokens)
}

export default bind(refreshTokens)
