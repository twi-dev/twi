import bind from "core/helper/graphql/bindResolver"
import auth from "core/auth/checkUser"

import NotFound from "core/error/http/NotFound"
import Forbidden from "core/error/http/Forbidden"

import getCommonAbilities from "acl/common"
import getStoryAbilities from "acl/story"
import Story from "db/model/Story"

async function story({args, ctx}) {
  const {user} = ctx.state

  const found = await Story.findById(args.id)

  if (!found) {
    throw new NotFound("Can't find story.")
  }

  const aclStory = getStoryAbilities(user)
  const aclCommon = getCommonAbilities(user)

  if (aclStory.cannot("read", found) && aclCommon.cannot("read", found)) {
    throw new Forbidden("You can't read this story")
  }

  return found
}

export default story |> auth |> bind
