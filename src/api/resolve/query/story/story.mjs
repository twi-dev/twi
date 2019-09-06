import bind from "core/helper/graphql/normalizeParams"
import NotFound from "core/error/http/NotFound"

import Story from "model/Story"

import getStoryAbilities from "acl/story"

async function story({args, ctx}) {
  const {user} = ctx.state

  const found = await Story.findByPk(args.id)
  const acl = getStoryAbilities({user})

  if (!found || acl.cannot("read", story)) {
    throw new NotFound("Cant find requested story.")
  }

  return found
}

export default story |> bind
