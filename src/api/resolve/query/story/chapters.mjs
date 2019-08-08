import isEmpty from "lodash/isEmpty"

import bind from "core/helper/graphql/bindResolver"
import pagination from "core/helper/graphql/pagination"

import Chapter from "db/model/Chapter"
import Story from "db/model/Story"

async function chapters({parent: story, args}) {
  const {page, limit} = args
  let ids = story.chapters

  if (isEmpty(ids)) {
    ids = await Story.findById(story.id).then(({chapters: list}) => list)
  }

  return Chapter.find({_id: {$in: ids}}) |> pagination(page, limit)
}

export default chapters |> bind
