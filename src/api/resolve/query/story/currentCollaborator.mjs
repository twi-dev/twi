import isEmpty from "lodash/isEmpty"

import bind from "core/helper/graphql/bindResolver"

import Collaborator from "db/model/Collaborator"
import Story from "db/model/Story"

async function currentCollaborator({parent: story, ctx}) {
  const {user} = ctx.state

  if (!user) {
    return null
  }

  let collaborators = story.collaborators

  if (isEmpty(collaborators)) {
    collaborators = await Story.findById(story.id)
      .then(({collaborators: ids}) => ids)
  }

  return Collaborator.findByUserId(user.id).where({_id: {$in: collaborators}})
}

export default currentCollaborator |> bind
