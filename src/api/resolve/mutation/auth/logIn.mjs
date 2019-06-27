import omit from "lodash/omit"

import bind from "core/graphql/bindResolver"
import Unauthorized from "core/error/http/Unauthorized"

import Session from "db/model/Session"
import User from "db/model/User"

async function logIn({args, ctx}) {
  const {email, password} = args.user

  const user = await User.findOne({email})

  if (!user || (user && await user.comparePassword(password) === false)) {
    throw new Unauthorized(
      "Can't authorize user. Check your credentials and try again."
    )
  }

  return Session.sign({user: omit(user, "password"), client: ctx.state.client})
}

export default bind(logIn)
