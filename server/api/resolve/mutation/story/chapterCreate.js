import bind from "server/lib/helper/graphql/normalizeParams"
import Forbidden from "server/lib/error/http/Forbidden"
import NotFound from "server/lib/error/http/NotFound"
import db from "server/lib/db/connection"

import Story from "server/model/Story"
import Chapter from "server/model/Chapter"

import getStoryAbilities from "server/acl/story"
import getCommonAbilities from "server/acl/common"

const chapterCreate = ({args, ctx}) => db.transaction(async transaction => {
  const {user} = ctx.state
  const {id, chapter} = args.story

  let story = await Story.findByPk(id, {transaction})

  if (!story) {
    throw new NotFound("Cannot find requested story.")
  }

  const aclCommon = getCommonAbilities(user)
  const aclStory = getStoryAbilities({user})

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

export default chapterCreate |> bind
