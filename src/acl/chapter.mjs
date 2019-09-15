import {AbilityBuilder as Builder} from "@casl/ability"

import Collaborator from "model/Collaborator"
import Chapter from "model/Chapter"

const {roles} = Collaborator

const getChapterAbilities = members => Builder.define(allow => {
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

  // Writers and translators can update content
  // TODO: Add "beta" collaborators here.
  if ([roles.write, roles.translate].includes(collaborator.role)) {
    allow("update", Chapter, "content")
  }
})

export default getChapterAbilities
