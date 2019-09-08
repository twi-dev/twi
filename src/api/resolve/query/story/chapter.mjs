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
    include: [{
      required: true,
      as: "stories",
      model: Story,
      where: {
        id: storyId
      },
      through: {
        where: {order}
      }
    }]
  })

  const [story] = chapter.stories

  if (acl.cannot("read", story)) {
    throw new NotFound("Can't finnd requested story.")
  }

  return chapter
}

export default getChapter |> bind
