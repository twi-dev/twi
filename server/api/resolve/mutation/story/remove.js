import bind from "server/lib/helper/graphql/normalizeParams"
import Forbidden from "server/lib/error/http/Forbidden"
import NotFound from "server/lib/error/http/NotFound"
import db from "server/lib/db/connection"

import Story from "server/model/Story"

import getCommonAbilities from "server/acl/common"
import getStoryAbilities from "server/acl/story"

const storyRemove = ({args, ctx}) => db.transaction(async transaction => {
  const {user} = ctx.state
  const {storyId} = args

  const story = await Story.findByPk(storyId, {transaction})

  if (!story) {
    throw new NotFound("Can't find requested story.")
  }

  const aclCommon = getCommonAbilities(user)
  const aclStory = getStoryAbilities({user})

  if (aclCommon.cannot("delete", story) || aclStory.cannot("delete", story)) {
    throw new Forbidden("You cannot delete the story.")
  }

  return story.destroy({transaction}).then(() => storyId)
})

export default storyRemove |> bind
