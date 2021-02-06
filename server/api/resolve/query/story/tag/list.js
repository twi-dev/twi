import getPageInfo from "server/lib/helper/graphql/getPageInfo"
import bind from "server/lib/helper/graphql/normalizeParams"
import toPage from "server/lib/helper/graphql/toPage"

import Tag from "server/model/Tag"

async function getTags({args}) {
  const pageInfo = getPageInfo(args)

  return Tag.findAndCountAll({...pageInfo}).then(toPage(pageInfo))
}

export default getTags |> bind
