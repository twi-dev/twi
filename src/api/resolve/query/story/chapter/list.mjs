import bind from "core/helper/graphql/normalizeParams"
import pagination from "core/helper/db/pagination"
import toPage from "core/helper/graphql/toPage"

import Chapter from "model/Chapter"

async function getChapters({args}) {
  const {storyId} = args

  const pageInfo = pagination(args)
  const where = {isDraft: false, storyId}

  return Chapter.findAndCountAll({...pageInfo, where})
    .then(toPage(pageInfo))
}

export default getChapters |> bind
