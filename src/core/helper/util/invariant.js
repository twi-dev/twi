import {sprintf as fmt} from "sprintf-js"
import isFunction from "lodash/isFunction"
import isString from "lodash/isString"

function invariant(predicate, error, ...format) {
  predicate = Boolean(isFunction(predicate) ? predicate() : predicate)

  if (predicate === false) {
    return
  }

  if (isString(error)) {
    throw new Error(fmt(error, ...format))
  }

  throw error
}

export default invariant
