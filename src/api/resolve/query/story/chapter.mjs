import bind from "core/helper/graphql/normalizeParams"
import NotFound from "core/error/http/NotFound"

import Story from "model/Story"
import Chapter from "model/Chapter"

import getStoryAbilities from "acl/story"

const include = [{model: Story, as: "story", required: true}]

async function getChapter({args, ctx}) {
  const {storyId, chapterNumber: order} = args
  const {user} = ctx.state

  const acl = getStoryAbilities({user})

  const chapter = await Chapter.findOne({include, where: {storyId, order}})

  if (!chapter || acl.cannot("read", chapter.story)) {
    throw new NotFound("Can't finnd requested chapter.")
  }

  return chapter
}

export default getChapter |> bind
