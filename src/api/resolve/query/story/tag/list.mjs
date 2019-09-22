import bind from "core/helper/graphql/normalizeParams"
import pagination from "core/helper/db/pagination"
import toPage from "core/helper/graphql/toPage"

import Tag from "model/Tag"

async function getTags({args}) {
  const pageInfo = pagination(args)

  return Tag.findAndCountAll({...pageInfo}).then(toPage(pageInfo))
}

export default getTags |> bind
