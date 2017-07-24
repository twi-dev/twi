import {sprintf as fmt} from "sprintf-js"
import isString from "lodash/isString"

function invariant(predicate, error, ...format) {
  if (Boolean(predicate) === false) {
    return
  }

  if (isString(error)) {
    throw new Error(fmt(error, ...format))
  }

  throw error
}

export default invariant
