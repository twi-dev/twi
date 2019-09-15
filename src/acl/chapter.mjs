import {AbilityBuilder as Builder} from "@casl/ability"

import Collaborator from "model/Collaborator"
import Chapter from "model/Chapter"

const {roles} = Collaborator

const getChapterAbilities = members => Builder.define(async allow => {
  const {user, collaborator} = members

  allow("read", Chapter, {isPublished: true})

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
