import bind from "core/helper/graphql/normalizeParams"
import NotFound from "core/error/http/NotFound"

import Story from "model/Story"

async function story({args}) {
  const found = await Story.findByPk(args.id)

  if (!found) {
    throw new NotFound("Cant find requested story.")
  }

  return found
}

export default bind(story)
