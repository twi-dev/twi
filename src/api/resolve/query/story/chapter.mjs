import bind from "core/helper/graphql/normalizeParams"
import NotFound from "core/error/http/NotFound"

import Story from "model/Story"
import Chapter from "model/Chapter"

import getStoryAbilities from "acl/story"

async function getChapter({args, ctx}) {
  const {storyId, chapterNumber: order} = args
  const {user} = ctx.state

  const acl = getStoryAbilities({user})

  const chapter = await Chapter.findOne({
    where: {storyId, order},
    include: [Story]
  })

  // FIXME: Find a way to rename "Story" as "story"
  if (!chapter || acl.cannot("read", chapter.Story)) {
    throw new NotFound("Can't finnd requested chapter.")
  }

  return chapter
}

export default getChapter |> bind
