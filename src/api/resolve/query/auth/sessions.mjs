import bind from "core/helper/graphql/normalizeParams"
import pagination from "core/helper/db/pagination"
import toPage from "core/helper/graphql/toPage"
import auth from "core/auth/checkUser"

import Session from "model/Session"

/**
 * Returns a list of session associated with the current user
 */
function getSessions({args, ctx}) {
  const {user} = ctx.state

  const pageInfo = pagination(args)

  return Session.findAndCountAll({...pageInfo, where: {userId: user.id}})
    .then(toPage(pageInfo))
}

export default getSessions |> auth |> bind
