import {AbilityBuilder as Builder} from "@casl/ability"

import Collaborator from "model/Collaborator"
import Chapter from "model/Chapter"
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

  // Collaborators must be able to update some story fields
  if (collaborator.role === Collaborator.roles.writer) {
    allow(["read", "update"], Story)
    forbid("update", Story, ["title", "isDraft", "isFinished"])

    // Writers can also create a new chapter
    allow("create", Chapter)

    return undefined
  }

  // Artists can update story's cover, but can't remove that
  if (collaborator.role === Collaborator.roles.art) {
    allow("update", Story, ["cover", "coverId"])
  }
})

export default getStoryAbilities
