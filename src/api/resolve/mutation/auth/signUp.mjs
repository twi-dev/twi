import omit from "lodash/omit"

import bind from "core/helper/graphql/normalizeParams"

import Session from "model/Session"
import User from "model/User"

async function signUp({args, ctx}) {
  const {client} = ctx.state

  const user = await User.create(args.user)

  return Session.sign({user: omit(user.toJSON(), "password"), client})
}

export default bind(signUp)
