import {AbilityBuilder as Builder} from "@casl/ability"

import Collaborator from "model/Collaborator"
import Story from "model/Story"
import User from "model/User"

const getStoryAbilities = members => Builder.define((allow, forbid) => {
  const {user, collaborator} = members

  // Drafted or unfinished stories avaialable to read only by the story's
  // publisher.
  allow("read", Story, {isDraft: false, isFinished: true})

  // Guests must be able to see stories as well, but can't do anything else
  // so just set above delcarations and stop.
  if (!user) {
    return undefined
  }

  // Creator can do whatever he want with own story.
  allow("manage", Story, {userId: user.id})

  // Moderators must be able to update only specific fields
  if (user.role === User.roles.moderator) {
    allow(
      ["read", "update"], Story,

      ["title", "description", "genres", "characters", "cover"],

      // This rule important, since moderator also can have own stories,
      // so we need to forbid of managing only ones he doesn't owns
      {userId: {$ne: user.id}}
    )
  }

  if (!collaborator) {
    return undefined
  }

  // Collaborators must be able to update story fields in general,
  // except its main info
  if (collaborator.role === Collaborator.roles.writer) {
    allow(["read", "update"], Story)
    forbid("update", Story, ["title", "description", "cover"])
  }
})

export default getStoryAbilities
