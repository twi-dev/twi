import isObject from "lodash/isObject"

import proxy from "server/lib/helper/decorator/proxy"
import apply from "server/lib/helper/proxy/selfInvokingClass"

@proxy({apply})
class ObjectIterator {
  static keys(iterable) {
    return new ObjectIterator(iterable).keys()
  }

  static values(iterable) {
    return new ObjectIterator(iterable).values()
  }

  static entries(iterable) {
    return new ObjectIterator(iterable).entries()
  }

  constructor(iterable) {
    if (iterable && !isObject(iterable)) {
      throw new TypeError("Iterable must be an object.")
    }

    this.__iterable = iterable
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

export default ObjectIterator
export const keys = ObjectIterator.keys
export const values = ObjectIterator.values
export const entries = ObjectIterator.entries
