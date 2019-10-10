import getPageInfo from "core/helper/graphql/getPageInfo"
import bind from "core/helper/graphql/normalizeParams"
import toPage from "core/helper/graphql/toPage"

import Collaborator from "model/Collaborator"

async function getCollaborators({parent: story, args}) {
  const storyId = story ? story.id : args.storyId
  const pageInfo = getPageInfo(args)

  return Collaborator.findAndCountAll({...pageInfo, where: storyId})
    .then(toPage(pageInfo))
}

export default getCollaborators |> bind
