import isPlainObject from "lodash/isPlainObject"

import objectIterator from "../sync/objectIterator"

const isArray = Array.isArray

/**
 * Iterate given object recursively
 *
 * @param {array|object} obj – iterable object
 * @param {function} cb – the function invoked per iteration
 * @param {any} ctx – "this" context for given callback
 *
 * @return {object}
 */
async function recursiveObjectMap(obj, cb, ctx) {
  if (!(isPlainObject(obj) || isArray(obj))) {
    throw new TypeError("Given iterable value should be an object or an array.")
  }

  const res = isArray(obj) ? [] : {}

  for (const [key, value] of objectIterator.entries(obj)) {
    if (isPlainObject(value) || isArray(value)) {
      res[key] = await recursiveObjectMap(value, cb, ctx)
    } else {
      res[key] = await cb.call(ctx, value, key, obj)
    }
  }

  return res
}

export default recursiveObjectMap
