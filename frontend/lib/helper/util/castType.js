/**
 * Casts type from a string value
 *
 * @param {string} value
 *
 * @return {string | number | boolean | undefined | null}
 *
 * @example
 *
 * castType("42") // => 42
 * castType("Hello, World!") // => "Hello, World"
 * castType("null") // => null
 * castType("undefined") // => undefined
 * castType("true") // => true
 * castType("false") // => false
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

export default castType
