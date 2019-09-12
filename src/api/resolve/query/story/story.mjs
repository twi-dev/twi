import bind from "core/helper/graphql/normalizeParams"
import NotFound from "core/error/http/NotFound"

import Story from "model/Story"

import getStoryAbilities from "acl/story"

async function getStory({args, ctx}) {
  const {user} = ctx.state

  const story = await Story.findByPk(args.id)

  const acl = getStoryAbilities({user})
  if (!story || acl.cannot("read", story)) {
    throw new NotFound("Cant find requested story.")
  }

  return story
}

export default getStory |> bind
