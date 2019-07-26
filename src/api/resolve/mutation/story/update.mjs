import bind from "core/helper/graphql/bindResolver"
import auth from "core/auth/checkUser"

import NotFound from "core/error/http/NotFound"
import Forbidden from "core/error/http/Forbidden"

import Story from "db/model/Story"

import getStoryAbilities from "db/model/Story/abilities"
import getUserAbilities from "db/model/User/abilities"

async function update({args, ctx}) {
  const {id, ...fields} = args.story

  const aclStory = getStoryAbilities(ctx.state.user)
  const aclUser = getUserAbilities(ctx.state.user)

  const story = await Story.findById(id)

  if (!story) {
    throw new NotFound("Can't find requested story.")
  }

  if (aclStory.cannot("manage", story) || aclUser.cannot("manage", story)) {
    throw new Forbidden("You can't manage the story.")
  }

  return story.update({$set: fields})
    .then(() => Story.findById(id))
}

export default update |> auth |> bind
