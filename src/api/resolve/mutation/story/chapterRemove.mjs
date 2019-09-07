import bind from "core/helper/graphql/normalizeParams"
import waterfall from "core/helper/array/runWaterfall"
import Forbidden from "core/error/http/Forbidden"
import NotFound from "core/error/http/NotFound"
import auth from "core/auth/checkUser"

import Story from "model/Story"
import Chapter from "model/Chapter"

import getStoryAbilities from "acl/story"
import getCommonAbilities from "acl/common"

async function chapterRemove({args, ctx}) {
  const {user} = ctx.state
  const {chapterId} = args

  // TODO: Don't forget to fetch a collaborator by current user
  const story = await Story.findOne({
    include: [{
      model: Chapter,
      as: "chapters",
      where: {
        id: chapterId
      }
    }]
  })

  if (!story) {
    throw new NotFound("Cannot find requested story.")
  }

  const aclCommon = getCommonAbilities(user)
  const aclStory = getStoryAbilities({user})

  if (aclCommon.cannot("update", story) || aclStory.cannot("update", story)) {
    throw new Forbidden("You cannot add a new chapter.")
  }

  const [chapter] = story.chapters

  return waterfall([
    () => chapter.destroy(),

    () => story.decrement("chaptersCount"),

    () => chapterId
  ])
}

export default chapterRemove |> auth |> bind
