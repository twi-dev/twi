import {Model} from "sequelize"

import bind from "lib/helper/graphql/normalizeParams"
import getPageInfo from "lib/helper/graphql/getPageInfo"
import parallel from "lib/helper/array/runParallel"
import toPage from "lib/helper/graphql/toPage"

import Story from "model/Story"

async function getTags({parent: story, args}) {
  if (!(story instanceof Model)) {
    story = await Story.findByPk(args.storyId)
  }

  const pageInfo = getPageInfo(args)

  if (!story) {
    return toPage(pageInfo)()
  }

  return parallel([() => story.getTags(), () => story.countTags()])
    .then(toPage(pageInfo))
}

export default getTags |> bind
