import bind from "server/lib/helper/graphql/normalizeParams"
import NotFound from "server/lib/error/http/NotFound"

import Story from "server/model/Story"
import Chapter from "server/model/Chapter"

import getStoryAbilities from "server/acl/story"
import getChapterAbilities from "server/acl/chapter"

const include = [{model: Story, as: "story", required: true, paranoid: false}]

async function getChapter({args, ctx}) {
  const {storyId, chapterNumber: order} = args
  const {user} = ctx.state

  const aclStory = getStoryAbilities({user})
  const aclChapter = getChapterAbilities({user})

  const chapter = await Chapter.findOne({
    include, paranoid: false, where: {storyId, order}
  })

  if (
    !chapter
      || aclStory.cannot("read", chapter.story)
      || aclChapter.cannot("read", chapter)
  ) {
    throw new NotFound("Can't finnd requested chapter.")
  }

  return chapter
}

export default getChapter |> bind
