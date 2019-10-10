import {Model} from "sequelize"

import bind from "core/helper/graphql/normalizeParams"
import getPageInfo from "core/helper/graphql/getPageInfo"
import parallel from "core/helper/array/runParallel"
import toPage from "core/helper/graphql/toPage"

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
