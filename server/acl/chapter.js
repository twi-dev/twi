import {AbilityBuilder as Builder} from "@casl/ability"

import Chapter from "server/model/Chapter"

const getChapterAbilities = members => Builder.define((allow, forbid) => {
  const {user} = members

  // Drafted or unfinished stories avaialable to read only by the story's
  // publisher.
  allow("read", Chapter, {isDraft: false})

  if (!user) {
    return undefined
  }

  // Owner can do whatever he want with the chapter
  allow("manage", Chapter, {"story.userId": user.id})

  // forbid to remove the chapter if its story has been removed
  forbid("manage", {"story.isRemoved": true})
})

export default getChapterAbilities
