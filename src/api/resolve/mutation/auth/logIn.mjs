import omit from "lodash/omit"

import bind from "core/helper/graphql/normalizeParams"
import Unauthorized from "core/error/http/Unauthorized"

import Session from "model/Session"
import User from "model/User"

async function logIn({args, ctx}) {
  const {email, password} = args.user

  const user = await User.findOne({where: {email}})

  if (!user || (user && await user.comparePassword(password) === false)) {
    throw new Unauthorized(
      "Can't authenticate user. Check your credentials and try again."
    )
  }

  return Session.sign({user: omit(user, "password"), client: ctx.state.client})
}

export default bind(logIn)
