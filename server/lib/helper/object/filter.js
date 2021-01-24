import iterator from "./iterator"

/**
 * Filter given object with predicate function
 *
 * @param {Object<string, any>} object Any iterable plain object
 * @param {(value: any, key: string, object: Object<string, any>) => boolean} predicate A function to call for each iteration.
 *   Should return boolean value.
 *
 * @param {any} ctx
 *
 * @return {Object<string, any>} filtered object
 */
function filter(object, predicate, ctx = null) {
  const res = {}

  for (const [key, value] of iterator(object).entries()) {
    if (predicate.call(ctx, value, key, object)) {
      res[key] = value
    }
  }

  return res
}

export default filter
