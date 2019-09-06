import omit from "lodash/omit"

import {add} from "core/auth/tokens"

import bind from "core/helper/graphql/normalizeParams"

import Session from "model/Session"
import User from "model/User"

// TODO: Add email notification
async function signUp({args, ctx}) {
  const {client} = ctx.state

  const user = await User.create(args.user)

  await add(user)

  return Session.sign({user: omit(user.toJSON(), "password"), client})
}

export default bind(signUp)
