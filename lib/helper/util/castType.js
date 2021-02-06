/**
 * Casts type from a string value
 *
 * @param {any} value
 *
 * @return {any}
 *
 * @api private
 */
function castType(value) {
  if (value === "null") {
    return null
  }

  if (value === "undefined") {
    return undefined
  }

  if (value === "true") {
    return true
  }

  if (value === "false") {
    return false
  }

  if (!Number.isNaN(Number(value))) {
    return Number(value)
  }

  return value
}

module.exports = castType
