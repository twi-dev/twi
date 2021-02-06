import bind from "server/lib/helper/graphql/normalizeParams"
import Forbidden from "server/lib/error/http/Forbidden"

import Story from "server/model/Story"
import getCommonAbilities from "server/acl/common"

async function storyCreate({args, ctx}) {
  const {user} = ctx.state
  const {story} = args

  const acl = getCommonAbilities(user)

  if (acl.cannot("create", Story)) {
    throw new Forbidden("You cannot create a new story.")
  }

  story.userId = user.id

  return Story.create(story)
}

export default storyCreate |> bind
