import isPlainObject from "lodash/isPlainObject"
import capitalize from "lodash/capitalize"
import camelCase from "camelcase"

import iterator from "./iterator"

const isArray = Array.isArray

function flat(object) {
  const entries = []
  function walk(iterable, path) {
    for (const [key, value] of iterator(iterable).entries()) {
      if (isArray(value) || isPlainObject(value)) {
        walk(value, path + capitalize(key))
      } else {
        entries.push([camelCase(path + capitalize(key)), value])
      }
    }
  }

  walk(object, "")

  return Object.fromEntries(entries)
}

export default flat
