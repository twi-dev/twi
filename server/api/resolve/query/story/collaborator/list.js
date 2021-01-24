import getPageInfo from "lib/helper/graphql/getPageInfo"
import bind from "lib/helper/graphql/normalizeParams"
import toPage from "lib/helper/graphql/toPage"

import Collaborator from "model/Collaborator"

async function getCollaborators({parent: story, args}) {
  const storyId = story ? story.id : args.storyId
  const pageInfo = getPageInfo(args)

  return Collaborator.findAndCountAll({...pageInfo, where: storyId})
    .then(toPage(pageInfo))
}

export default getCollaborators |> bind
