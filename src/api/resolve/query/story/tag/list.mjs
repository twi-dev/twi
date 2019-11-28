import getPageInfo from "lib/helper/graphql/getPageInfo"
import bind from "lib/helper/graphql/normalizeParams"
import toPage from "lib/helper/graphql/toPage"

import Tag from "model/Tag"

async function getTags({args}) {
  const pageInfo = getPageInfo(args)

  return Tag.findAndCountAll({...pageInfo}).then(toPage(pageInfo))
}

export default getTags |> bind
