import iterator from "./iterator"

/**
 * Map given object with callback and return new one
 *
 * @param {object} object Iterable object
 * @param {(value: any, key: string, object: Object<string, any>) => any} cb A function to call for each iteration.
 * @param {any} ctx "this" context that will be using with the callback
 *
 * @return {object}
 */
function mapObject(object, cb, ctx = null) {
  const res = {}

  for (const [key, value] of iterator(object).entries()) {
    res[key] = cb.call(ctx, value, key, object)
  }

  return res
}

export default mapObject
