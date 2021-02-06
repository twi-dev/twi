import {defineAbility} from "@casl/ability"

import Story from "server/model/Story"
import User from "server/model/User"

const getStoryAbilities = members => defineAbility(allow => {
  const {user} = members

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
})

export default getStoryAbilities
