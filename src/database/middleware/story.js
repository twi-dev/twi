import invariant from "@octetstream/invariant"
import isEmpty from "lodash/isEmpty"

import {before, after} from "core/database/middleware"

import Chapter from "database/model/Chapter"

async function afterValidate({translation}) {
  if (translation.flag === false) {
    return true
  }

  const author = translation.author

  invariant(
    isEmpty(author), "Author's information required for translations."
  )

  invariant(!author.name, "Author's name is required.")

  // TODO: Also, add a link validation
  invariant(!author.profile, "Required a link to the author's profile.")

  invariant(!translation.original, "Required a link to the original story.")
}

async function beforeRemove(story) {
  await Chapter.removeManyById(story.chapters)
}

module.exports = {
  beforeRemove: before.remove(beforeRemove),
  afterValidate: after.validate(afterValidate)
}
