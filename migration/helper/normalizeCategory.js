const isString = require("lodash/isString")

const normalize = require("./normalizeCategoryOrTag")

function normalizeCategory(category) {
  if (isString(category)) {
    category = {name: category}
  }

  let {prefix, ...rest} = normalize(category)

  if (prefix && !prefix.endsWith(":")) {
    prefix += ":"
  }

  return {
    ...rest, prefix
  }
}

export default normalizeCategory
