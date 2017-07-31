import isFunction from "lodash/isFunction"
import isString from "lodash/isString"

const fulfillPost = handler => function(doc, next) {
  const onFulfilled = res => next(null, res)

  handler(doc).then(onFulfilled, err => next(err))
}

const fulfillSerial = handler => function(next) {
  const onFulfilled = res => next(null, res)

  handler.call(this, this).then(onFulfilled, err => next(err))
}

const fulfillParallel = handler => function(next, cb) {
  next() // Exec the next middleware from queue, huh?

  const onFulfilled = res => cb(null, res)

  handler.call(this, this).then(onFulfilled, cb)
}

const wrapMiddleware = (kind, parallel) => handler => {
  if (kind.toLowerCase() === "post") {
    return fulfillPost(handler)
  }

  return parallel ? fulfillParallel(handler) : fulfillSerial(handler)
}

const defineMiddleware = (kind, type, parallel) => handler => {
  parallel = Boolean(parallel)

  if (!type || !isString(type)) {
    throw new TypeError("Middleware type should be a non-empty string.")
  }

  if (!isFunction(handler)) {
    throw new TypeError("Middleware handler should be a function.")
  }

  handler = wrapMiddleware(kind, parallel)(handler)

  const middleware = {kind, type, handler}

  if (kind.toLowerCase() !== "post") {
    middleware.parallel = parallel
  }

  return middleware
}

const pre = (...args) => defineMiddleware("pre", ...args)

const post = (...args) => defineMiddleware("post", ...args)

export {pre, post}
