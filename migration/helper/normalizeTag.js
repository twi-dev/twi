const isString = require("lodash/isString")

const normalize = require("./normalizeCategoryOrTag")

function normalizeTag(tag, prefix = undefined) {
  if (isString(tag)) {
    tag = {name: tag}
  }

  if (prefix != null) {
    tag.name = prefix + tag.name
  }

  tag = normalize(tag)

  return tag
}

export default normalizeTag
