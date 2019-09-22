import bind from "core/helper/graphql/normalizeParams"
import pagination from "core/helper/db/pagination"
import toPage from "core/helper/graphql/toPage"

import Collaborator from "model/Collaborator"

async function getCollaborators({parent: story, args}) {
  const storyId = story ? story.id : args.storyId
  const pageInfo = pagination(args)

  return Collaborator.findAndCountAll({...pageInfo, where: storyId})
    .then(toPage(pageInfo))
}

export default getCollaborators |> bind
