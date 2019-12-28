import isPlainObject from "lodash/isPlainObject"

import createSlug from "lib/helper/util/createSlug"

/**
 * Assign common params both for category and tag
 */
function normalizeCategoryOrTag(value) {
  if (!isPlainObject(value)) {
    throw new TypeError("Value must be an object.")
  }

  const now = new Date()

  return {
    ...value,

    name: value.name.toLowerCase(),
    slug: createSlug(value.slug ?? value.name),
    created_at: now,
    updated_at: now
  }
}

export default normalizeCategoryOrTag
