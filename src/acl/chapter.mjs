import {AbilityBuilder as Builder} from "@casl/ability"

import Collaborator from "model/Collaborator"
import Chapter from "model/Chapter"

const {roles} = Collaborator

const getChapterAbilities = members => Builder.define((allow, forbid) => {
  const {user, collaborator} = members

  // Drafted or unfinished stories avaialable to read only by the story's
  // publisher.
  allow("read", Chapter, {isDraft: false})

  if (!user) {
    return undefined
  }

  // Owner can do whatever he want with the chapter
  allow("manage", Chapter, {"story.userId": user.id})

  if (!collaborator) {
    return undefined
  }

  // Writers, translators and betas can update content
  if ([roles.write, roles.translate, roles.beta].includes(collaborator.role)) {
    allow("update", Chapter, "content")
  }

  // forbid to remove the chapter if its story has been removed
  forbid("manage", {"story.isRemoved": true})
})

export default getChapterAbilities
