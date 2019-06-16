import bind from "core/graphql/bindResolver"
import User from "db/model/User"

import NotFound from "core/error/http/NotFound"

async function findUserByLogin({args}) {
  const user = await User.findOne({login: args.login})

  if (!user) {
    throw new NotFound("Can't fund a user with given login.")
  }

  return user
}

export default bind(findUserByLogin)
