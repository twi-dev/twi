import bind from "core/graphql/bindResolver"
// import mail from "core/mail/transport"

import User from "db/model/User"
import Session from "db/model/Session"

async function authSignUp({args}) {
  // const {email} = args.user

  const user = await User.createOne(args.user)

  return Session.sign(user)
}

export default authSignUp |> bind
