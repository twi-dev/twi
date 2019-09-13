import bind from "core/helper/graphql/normalizeParams"
import Forbidden from "core/error/http/Forbidden"
import NotFound from "core/error/http/NotFound"
import auth from "core/auth/checkUser"
import conn from "core/db/connection"

import Story from "model/Story"
import getCommonAbilities from "acl/common"
import getStoryAbilities from "acl/story"

const storyRemove = ({args, ctx}) => conn.transaction(async transaction => {
  const {user} = ctx.state
  const {storyId} = args

  // TODO: fetch member as well
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

export default storyRemove |> auth |> bind
