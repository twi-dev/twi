import iterator from "./iterator"

/**
 * Iterates through the given onject and calls a callback function
 *
 * @param {Object<string, any>} object
 * @param {(value: any, key: string, object: Object<string, any>) => void} cb A function to call for each iteration.
 * @param {any} ctx
 *
 * @return void
 */
function forEach(object, cb, ctx = null) {
  for (const [key, value] of iterator(object).entries()) {
    cb.call(ctx, value, key, object)
  }
}

export default forEach
