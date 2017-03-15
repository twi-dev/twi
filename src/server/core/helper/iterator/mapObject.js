import objectIterator from "./objectIterator"

/**
 * Map given object with callback and return new one
 *
 * @param object obj – iterable object
 * @param function cb – callback
 * @param any ctx – "this" context that will using with the callback
 */
function mapObject(obj, cb, ctx = null) {
  const res = {}

  for (const [key, value] of objectIterator.entries(obj)) {
    res[key] = cb.call(ctx, value, key, obj)
  }

  return res
}

export default mapObject
