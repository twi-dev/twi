import bind from "core/helper/graphql/bindResolver"

import User from "db/model/User"

import NotFound from "core/error/http/NotFound"

async function getUser({parent}) {
  const user = await User.findById(parent.userId ?? parent.creator ?? parent)

  if (!user) {
    throw new NotFound("Can't find a user with given login.")
  }

  return user
}

export default bind(getUser)
