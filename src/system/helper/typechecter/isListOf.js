import getType from "../util/getType"

const isArray = Array.isArray

function isListOf(list, predicate, ctx = null) {
  if (isArray(list) === false) {
    throw new TypeError(
      `Allowed only array as list. Given type of ${getType(list)} ` +
      "can't be used with this checker."
    )
  }

  for (const [key, val] of list.entries()) {
    if (predicate.call(ctx, val, key, list) === false) {
      return false
    }
  }

  return true
}

const bindList = list => (predicate, ctx) => isListOf(list, predicate, ctx)

isListOf.bindList = bindList

export default isListOf
