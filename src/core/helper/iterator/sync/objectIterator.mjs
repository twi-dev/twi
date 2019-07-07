import invariant from "@octetstream/invariant"
import isObject from "lodash/isObject"

import deprecate from "core/helper/decorator/deprecate"

class ObjectIterator {
  constructor(iterable) {
    invariant(
      iterable && isObject(iterable) === false, TypeError,

      "Iterable must be an object."
    )

    this.__iterable = iterable

    // I'm using this method because of fucking semicolon -_-
    Array.from([Symbol.iterator, "keys", "values", "entries"])
      .forEach(name => this[name] = this[name].bind(this))
  }

  keys() {
    if (!this.__iterable) {
      return []
    }

    return Object.keys(this.__iterable)
  }

  * values() {
    for (const [, value] of this.entries()) {
      yield value
    }
  }

  * entries() {
    for (const key of this.keys()) {
      const value = this.__iterable[key]

      yield [key, value]
    }
  }

  [Symbol.iterator]() {
    return this.values()
  }
}

const objectIterator = (iterable, entries = false) => {
  if (entries) {
    console.warn(
      "The \"entries\" flag is deprecated. "
        + "Use objectIterator(iterable).entries() instead."
    )

    return new ObjectIterator(iterable).entries()
  }

  return new ObjectIterator(iterable)
}

const keys = iterable => new ObjectIterator(iterable).keys()

const values = iterable => new ObjectIterator(iterable).values()

const entries = iterable => new ObjectIterator(iterable).entries()

objectIterator.keys = keys |> deprecate(
  "Use objectIterator(iterable).keys() instead."
)

objectIterator.values = values |> deprecate(
  "Use objectIterator(iterable).values() instead."
)

objectIterator.entries = entries |> deprecate(
  "Use objectIterator(iterable).entries() instead"
)

export default objectIterator
export {keys, values, entries}
