import invariant from "@octetstream/invariant"
import isObject from "lodash/isObject"

/**
 * Simplest object iterator which I can imagine :D
 *
 * @param {object} obj
 * @param {boolean} entries
 *
 * @yields {any|array}
 */
function* objectIterator(obj, entries = false) {
  invariant(!isObject(obj), TypeError, "Allowed only objects as iterable.")

  for (const [key, value] of Object.entries(obj)) {
    yield entries ? [key, value] : value
  }
}

const entries = obj => objectIterator(obj, true)

objectIterator.entries = entries

export {entries}
export default objectIterator
