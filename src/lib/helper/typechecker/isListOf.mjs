import isFunction from "lodash/isFunction"

import getType from "lib/helper/util/getType"

const isArray = Array.isArray

function isListOf(list, predicate, ctx = null) {
  if (!isArray(list)) {
    throw new TypeError(
      "Expected an array as \"list\" argument, "
        + `but given value is type of ${getType(list)}.`
    )
  }

  if (!isFunction(predicate)) {
    throw new TypeError(
      `Predicate should be a function, not type of ${getType(predicate)}.`
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
