import bind from "lib/helper/graphql/normalizeParams"

import Collaborator from "model/Collaborator"

function getCurrentCollaborator({parent: story, ctx}) {
  const {user} = ctx.state

  return Collaborator.findOne({where: {storyId: story.id, userId: user.id}})
}

export default getCurrentCollaborator |> bind
