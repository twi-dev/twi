import bind from "core/graphql/bindResolver"

import Unauthorized from "core/error/http/Unauthorized"

import Session from "db/model/Session"
import User from "db/model/User"

async function authSignIn({args, ctx}) {
  const user = await User.findOne({email: args.user.email})

  if (!user) {
    throw new Unauthorized(
      "Can't authorize user. Check your credentials and try again."
    )
  }

  return Session.sign({userId: user.id, client: ctx.client})
}

export default bind(authSignIn)
