import bind from "core/helper/graphql/normalizeParams"
import NotFound from "core/error/http/NotFound"

import User from "model/User"

async function user({args}) {
  const found = await User.findByLogin(args.login, {
    attributes: {exclude: ["password"]}
  })

  if (!found) {
    throw new NotFound("Can't find a user with given login.")
  }

  return found
}

export default user |> bind
