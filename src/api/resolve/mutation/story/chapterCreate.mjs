import bind from "core/helper/graphql/normalizeParams"
import Forbidden from "core/error/http/Forbidden"
import auth from "core/auth/checkUser"

import Story from "model/Story"

import getStoryAbilities from "acl/story"
import getCommonAbilities from "acl/common"

async function chapterCreate({args, ctx}) {
  const {user} = ctx.state
  const {id, chapter} = args.story

  // TODO: Don't forget to fetch a collaborator by current user
  const story = await Story.findByPk(id)

  const aclCommon = getCommonAbilities(user)
  const aclStory = getStoryAbilities({user})

  if (aclCommon.cannot("update", story) || aclStory.cannot("update", story)) {
    throw new Forbidden("You cannot add a new chapter.")
  }

  return story.addChapter(chapter)
    .then(() => story.increment("chaptersCount"))
}

export default chapterCreate |> auth |> bind
