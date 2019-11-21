import isPlainObject from "lodash/isPlainObject"

import createSlug from "core/helper/util/createSlug"

function normalizeCategoryOrTag(categoryOrTag) {
  if (!isPlainObject(categoryOrTag)) {
    categoryOrTag = {name: categoryOrTag}
  }

  const now = new Date()

  return {
    ...categoryOrTag,

    slug: createSlug(categoryOrTag.slug ?? categoryOrTag.name),
    created_at: now,
    updated_at: now
  }
}

export default normalizeCategoryOrTag
