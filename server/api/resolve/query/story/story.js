import bind from "server/lib/helper/graphql/normalizeParams"
import NotFound from "server/lib/error/http/NotFound"

import Story from "server/model/Story"

import getStoryAbilities from "server/acl/story"

async function getStory({args, ctx}) {
  const {user} = ctx.req.session

  const story = await Story.findByPk(args.id, {paranoid: false})

  const acl = getStoryAbilities({user})
  if (!story || acl.cannot("read", story)) {
    throw new NotFound("Cant find requested story.")
  }

  return story
}

export default getStory |> bind
