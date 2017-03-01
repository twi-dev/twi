import isFunction from "lodash/isFunction"

// Builtin class, do not use directly
class Base {
  constructor(cb) {
    this.__callback = cb
  }

  end(data) {
    return isFunction(this.__callback) ? this.__callback(data) : this
  }
}

export default Base
