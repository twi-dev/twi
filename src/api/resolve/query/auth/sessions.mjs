import getPageInfo from "core/helper/graphql/getPageInfo"
import bind from "core/helper/graphql/normalizeParams"
import toPage from "core/helper/graphql/toPage"
import auth from "core/auth/checkUser"

import Session from "model/Session"

/**
 * Returns a list of session associated with the current user
 */
function getSessions({args, ctx}) {
  const {user} = ctx.state

  const pageInfo = getPageInfo(args)

  return Session.findAndCountAll({...pageInfo, where: {userId: user.id}})
    .then(toPage(pageInfo))
}

export default getSessions |> auth |> bind
