// Based on:
//   https://github.com/xmlking/koa-router-decorators/blob/master/src/index.ts
import Router from "koa-router"

import isString from "lodash/isString"
import isEmpty from "lodash/isEmpty"

const toLowerCase = string => String.prototype.toLowerCase.call(string)

// Map of allowed HTTP methods
const methods = {
  get: "GET",
  post: "POST",
  put: "PUT",
  delete: "DELETE",
  patch: "PATCH",
  options: "OPTIONS",
  head: "HEAD",

  // For all methods
  all: "ALL"
}

/**
 * Provides more declarative way to definitions of Koa Router controllers
 * with the ES.next decorators magic! Whoosh!
 *
 * @param string path – a path of your route
 * @param string method – a name of HTTP method
 * @param function|array middleware – a list of route middlewares
 */
const route = (path, method, ...middleware) => function(target, k, descriptor) {
  if (!isString(path)) {
    throw new TypeError("Path should be a string.")
  }

  if (!target.router) {
    target.router = new Router()
  }

  if (isEmpty(method)) {
    throw new Error("HTTP method name cannot be empty.")
  }

  if (!isString(method)) {
    throw new TypeError("HTTP method name should be a string.")
  }

  method = toLowerCase(method)

  if (!(method in methods)) {
    throw new Error(`Unknown HTTP method name: ${method}`)
  }

  // Add handler to given method
  // TODO: Add support for static class methods though initializer
  target.router[method](path, ...middleware, descriptor.value)
}

export {methods, route}
