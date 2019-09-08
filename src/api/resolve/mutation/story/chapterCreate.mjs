import bind from "core/helper/graphql/normalizeParams"
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
  let story = await Story.findByPk(id)

  if (!story) {
    throw new NotFound("Cannot find requested story.")
  }

  const aclCommon = getCommonAbilities(user)
  const aclStory = getStoryAbilities({user})

  if (aclCommon.cannot("update", story) || aclStory.cannot("update", story)) {
    throw new Forbidden("You cannot add a new chapter.")
  }

  story = await story.increment("chaptersCount").then(() => story.reload())

  chapter.order = story.chaptersCount
  chapter.storyId = story.id

  return Chapter.create(chapter)
}

export default chapterCreate |> auth |> bind
