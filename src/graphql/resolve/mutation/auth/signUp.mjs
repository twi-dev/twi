import bind from "core/graphql/bindResolver"
// import mail from "core/mail/transport"

import User from "db/model/User"
import Session from "db/model/Session"

async function authSignUp({args, ctx}) {
  const user = await User.createOne(args.user)

  return Session.sign({userId: user.id, client: ctx.client})
}

export default authSignUp |> bind
