import bind from "core/helper/graphql/normalizeParams"
import Forbidden from "core/error/http/Forbidden"
import NotFound from "core/error/http/NotFound"
import auth from "core/auth/checkUser"
import conn from "core/db/connection"

import Story from "model/Story"
import Chapter from "model/Chapter"

import getStoryAbilities from "acl/story"
import getCommonAbilities from "acl/common"

const chapterCreate = ({args, ctx}) => conn.transaction(async t => {
  const {user} = ctx.state
  const {id, chapter} = args.story

  // TODO: Don't forget to fetch a collaborator by current user
  let story = await Story.findByPk(id, {transaction: t})

  if (!story) {
    throw new NotFound("Cannot find requested story.")
  }

  const aclCommon = getCommonAbilities(user)
  const aclStory = getStoryAbilities({user})

  if (aclCommon.cannot("update", story) || aclStory.cannot("update", story)) {
    throw new Forbidden("You cannot add a new chapter.")
  }

  story = await story.increment("chaptersCount", {transaction: t})
    .then(() => story.reload({transaction: t}))

  chapter.order = story.chaptersCount
  chapter.storyId = story.id

  return Chapter.create(chapter, {transaction: t})
})

export default chapterCreate |> auth |> bind
