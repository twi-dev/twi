import bind from "core/helper/graphql/normalizeParams"
import waterfall from "core/helper/array/runWaterfall"
import Forbidden from "core/error/http/Forbidden"
import NotFound from "core/error/http/NotFound"
import auth from "core/auth/checkUser"

import Story from "model/Story"
import Chapter from "model/Chapter"

import getStoryAbilities from "acl/story"
import getCommonAbilities from "acl/common"

async function chapterCreate({args, ctx}) {
  const {user} = ctx.state
  const {id, chapter} = args.story

  // TODO: Don't forget to fetch a collaborator by current user
  const story = await Story.findByPk(id)

  if (!story) {
    throw new NotFound("Cannot find requested story.")
  }

  const aclCommon = getCommonAbilities(user)
  const aclStory = getStoryAbilities({user})

  if (aclCommon.cannot("update", story) || aclStory.cannot("update", story)) {
    throw new Forbidden("You cannot add a new chapter.")
  }

  const created = await Chapter.create(chapter)

  return waterfall([
    () => story.addChapter(created.id),

    () => story.increment("chaptersCount"),

    () => created
  ])
}

export default chapterCreate |> auth |> bind
