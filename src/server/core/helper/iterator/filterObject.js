import objectIterator from "./objectIterator"

/**
 * Filter given object with predicate function
 *
 * @param object obj – any iterable plain object
 * @param function predicate – the function invoked per iteration.
 *   Should return boolean value.
 * @param any ctx
 */
function filterObject(obj, predicate, ctx) {
  const res = {}

  for (const [key, value] of objectIterator.entries(obj)) {
    if (predicate.call(ctx, value, key, obj) === true) {
      res[key] = value
    }
  }

  return res
}

export default filterObject
