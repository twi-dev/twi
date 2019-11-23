import isString from "lodash/isString"

import normalize from "./normalizeCategoryOrTag"

function normalizeCategory(category) {
  if (isString(category)) {
    category = {name: category}
  }

  let {prefix, ...rest} = normalize(category)

  if (!prefix.endsWith(":")) {
    prefix += ":"
  }

  return {
    ...rest, prefix
  }
}

export default normalizeCategory
