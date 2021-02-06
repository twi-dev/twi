import getPageInfo from "server/lib/helper/graphql/getPageInfo"
import bind from "server/lib/helper/graphql/normalizeParams"
import toPage from "server/lib/helper/graphql/toPage"

import Session from "server/model/Session"

/**
 * Returns a list of session associated with the current user
 */
function getSessions({args, ctx}) {
  const {user} = ctx.state

  const pageInfo = getPageInfo(args)

  return Session.findAndCountAll({...pageInfo, where: {userId: user.id}})
    .then(toPage(pageInfo))
}

export default getSessions |> bind
