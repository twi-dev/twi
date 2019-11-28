import getPageInfo from "lib/helper/graphql/getPageInfo"
import bind from "lib/helper/graphql/normalizeParams"
import toPage from "lib/helper/graphql/toPage"

import Chapter from "model/Chapter"

async function getChapters({parent: story, args}) {
  const storyId = story ? story.id : args.storyId

  const pageInfo = getPageInfo(args)
  const where = {isDraft: false, storyId}

  return Chapter.findAndCountAll({...pageInfo, where})
    .then(toPage(pageInfo))
}

export default getChapters |> bind
