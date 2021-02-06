import getPageInfo from "server/lib/helper/graphql/getPageInfo"
import bind from "server/lib/helper/graphql/normalizeParams"
import toPage from "server/lib/helper/graphql/toPage"

import Chapter from "server/model/Chapter"

async function getChapters({parent: story, args}) {
  const storyId = story ? story.id : args.storyId

  const pageInfo = getPageInfo(args)
  const where = {isDraft: false, storyId}

  return Chapter.findAndCountAll({...pageInfo, where})
    .then(toPage(pageInfo))
}

export default getChapters |> bind
