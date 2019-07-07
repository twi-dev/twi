import objectIterator from "./objectIterator"

/**
 * Filter given object with predicate function
 *
 * @param {object} object – any iterable plain object
 * @param {function} predicate – the function invoked per iteration.
 *   Should return boolean value.
 *
 * @param {any} ctx
 *
 * @return {object} – filtered object
 */
function filterObject(object, predicate, ctx) {
  const res = {}

  for (const [key, value] of objectIterator(object).entries()) {
    if (predicate.call(ctx, value, key, object) === true) {
      res[key] = value
    }
  }

  return res
}

export default filterObject
