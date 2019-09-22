import {Model} from "sequelize"

import waterfall from "core/helper/array/runWaterfall"
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
    return toPage(pageInfo)({rows: [], count: 0})
  }

  return waterfall([
    () => Promise.all([story.getTags.bind(story), story.countTags.bind(story)]),

    ([rows, count]) => ({rows, count}),

    toPage(pageInfo)
  ])
}

export default getTags |> bind
