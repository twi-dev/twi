import getPageInfo from "core/helper/graphql/getPageInfo"
import bind from "core/helper/graphql/normalizeParams"
import toPage from "core/helper/graphql/toPage"

import Tag from "model/Tag"

async function getTags({args}) {
  const pageInfo = getPageInfo(args)

  return Tag.findAndCountAll({...pageInfo}).then(toPage(pageInfo))
}

export default getTags |> bind
