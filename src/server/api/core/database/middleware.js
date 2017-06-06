import isFunction from "lodash/isFunction"
import isString from "lodash/isString"

import getType from "system/helper/util/getType"

const fulfillPost = (document, next) => function(handler) {
  const onFulfilled = res => next(null, res)

  handler(document).then(onFulfilled, err => next(err))
}

const fulfillSerial = next => function(handler) {
  const onFulfilled = res => next(null, res)

  handler(this).then(onFulfilled, err => next(err))
}

const fulfillParallel = (next, cb) => function(handler) {
  next()

  const onFulfilled = res => cb(null, res)

  handler(this).then(onFulfilled, cb)
}

const wrapAsyncMiddleware = (kind, parallel) => handler => function(...args) {
  if (kind.toLowerCase() === "post") {
    return fulfillPost(...args)(handler)
  }

  return parallel === true
    ? fulfillParallel(...args).call(this, handler)
    : fulfillSerial(...args).call(this, handler)
}

const defineMIddleware = (kind, type, parallel) => handler => {
  parallel = Boolean(parallel)

  if (!type || !isString(type)) {
    throw new TypeError("Middleware type should be a non-empty function.")
  }

  if (!isFunction(handler)) {
    throw new TypeError(
      "Middleware handler should be a function, " +
      `but given value is ${getType(handler)}`
    )
  }

  handler = wrapAsyncMiddleware(kind, parallel)(handler)

  return {kind, type, parallel, handler}
}

const pre = (...args) => defineMIddleware("pre", ...args)

const post = (...args) => defineMIddleware("post", ...args)

export {pre, post}
