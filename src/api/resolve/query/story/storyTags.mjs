import {Model} from "sequelize"

import parallel from "core/helper/array/runParallel"
import bind from "core/helper/graphql/normalizeParams"
import pagination from "core/helper/db/pagination"
import toPage from "core/helper/graphql/toPage"

import Story from "model/Story"

// FIXME: If possible, wind a better way to get story's tags
async function getTags({parent: story, args}) {
  if (!(story instanceof Model)) {
    story = await Story.findByPk(args.storyId)
  }

  const pageInfo = pagination(args)

  if (!story) {
    return toPage(pageInfo)()
  }

  return parallel([() => story.getTags(), () => story.countTags()])
    .then(toPage(pageInfo))
}

export default getTags |> bind
