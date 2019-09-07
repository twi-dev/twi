import bind from "core/helper/graphql/normalizeParams"
import NotFound from "core/error/http/NotFound"

import User from "model/User"

async function getUser({args}) {
  const user = await User.findByLogin(args.login, {
    attributes: {exclude: ["password"]}
  })

  if (!user) {
    throw new NotFound("Can't find a user with given login.")
  }

  return user
}

export default getUser |> bind
