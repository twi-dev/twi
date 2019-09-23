import bind from "core/helper/graphql/normalizeParams"
import pagination from "core/helper/db/pagination"
import toPage from "core/helper/graphql/toPage"

import Chapter from "model/Chapter"

async function getChapters({parent: story, args}) {
  const storyId = story ? story.id : args.storyId

  const pageInfo = pagination(args)
  const where = {isDraft: false, deletedAt: null, storyId}

  return Chapter.findAndCountAll({...pageInfo, where})
    .then(toPage(pageInfo))
}

export default getChapters |> bind
