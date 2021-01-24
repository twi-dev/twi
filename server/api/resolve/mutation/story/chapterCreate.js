import bind from "lib/helper/graphql/normalizeParams"
import Forbidden from "lib/error/http/Forbidden"
import NotFound from "lib/error/http/NotFound"
import auth from "lib/auth/checkUser"
import db from "lib/db/connection"

import Story from "model/Story"
import Chapter from "model/Chapter"
import Collaborator from "model/Collaborator"

import getStoryAbilities from "acl/story"
import getCommonAbilities from "acl/common"

const chapterCreate = ({args, ctx}) => db.transaction(async transaction => {
  const {user} = ctx.state
  const {id, chapter} = args.story

  let story = await Story.findByPk(id, {transaction})

  if (!story) {
    throw new NotFound("Cannot find requested story.")
  }

  const collaborator = await Collaborator.findOne({
    where: {userId: user.id, storyId: story.id}
  })

  const aclCommon = getCommonAbilities(user)
  const aclStory = getStoryAbilities({user, collaborator})

  if (
    aclCommon.cannot("update", story) || (
      aclStory.cannot("create", Chapter) && aclStory.cannot("manage", story)
    )
  ) {
    throw new Forbidden("You can't add a new chapter.")
  }

  story = await story.increment("chaptersCount", {transaction})
    .then(() => story.reload({transaction}))

  chapter.order = story.chaptersCount
  chapter.storyId = story.id

  return Chapter.create(chapter, {transaction})
})

export default chapterCreate |> auth |> bind
