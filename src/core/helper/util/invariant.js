import {sprintf as fmt} from "sprintf-js"
import isFunction from "lodash/isFunction"
import isString from "lodash/isString"

/**
 * @param boolean predicate
 * @param string|Function Err
 * @param any ...format
 */
function invariant(predicate, Err, ...format) {
  if (Boolean(predicate) === false) {
    return
  }

  if (isString(Err)) {
    throw new Error(fmt(Err, ...format))
  }

  if (isFunction(Err)) {
    const message = format.shift()

    throw new Err(fmt(message, ...format))
  }

  throw Err
}

export default invariant
