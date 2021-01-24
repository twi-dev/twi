import iterator from "./iterator"

/**
 * Find a key withing a given object
 *
 * @param {Object<string, any>} object
 * @param {(value: any, key: string, object: Object<string, any>) => boolean} predicate A function to call for each iteration.
 * @param {any} [ctx = null]
 *
 * @return {string | void}
 */
function findKey(object, predicate, ctx = null) {
  for (const [key, value] of iterator(object).entries()) {
    if (predicate.call(ctx, value, key, object) === true) {
      return key
    }
  }

  return undefined
}

export default findKey
