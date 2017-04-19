import Router from "koa-router"
import rd from "require-dir"

import isPlainObject from "lodash/isPlainObject"
import isFunction from "lodash/isFunction"
import isString from "lodash/isString"
import merge from "lodash/merge"

import getType from "system/helper/util/getType"
import objectIterator from "system/helper/iterator/sync/objectIterator"
import {warn} from "system/log"

import NotFoundException from "system/error/http/NotFound"
import NotAllowedException from "system/error/http/NotAllowed"

const r = new Router()

const allowedMethods = [
  "get",
  "post",
  "patch",
  "put",
  "delete",
  "del",
  "options",
  "head",
  "all"
]

function actionNotFound({url}) {
  throw new NotFoundException(`Page not found on route ${url}`)
}

function actionNotAllowed({method, url}) {
  throw new NotAllowedException(`Method ${method} not allowed on route ${url}`)
}

// Default options for controller
const defaults = {
  // Name of the home page controller
  indexRoute: "home",

  // Handlers for non-matched routes
  nonMatched: {
    get: actionNotFound,
    all: actionNotAllowed
  }
}

/**
 * @param Router router
 * @param object handlers
 *
 * @return Router
 */
function mountNonMatchedHandlers(router, handlers) {
  for (const [key, handler] of objectIterator.entries(handlers)) {
    const method = key.toLowerCase()

    if (!allowedMethods.includes(method)) {
      continue
    }

    if (!isFunction(handler)) {
      throw new TypeError(
        "Handler for non-matched route should be a function. " +
        `But given value for ${key} method hanlder ` +
        `is type of ${getType(handler)}.`
      )
    }

    router[method]("*", handler)
  }

  return router
}

/**
 * Build given routes
 *
 * @param object routes
 *
 * @return functino:
 *   - @param object options
 *
 *   - @return Router
 */
const buildRoutes = routes => function(options = {}) {
  if (!isPlainObject(options)) {
    throw new TypeError(
      "Options for controller should be passed as plain JavaScript object, " +
      `but given value has type of ${getType(options)}.`
    )
  }

  options = merge({}, defaults, options)

  for (const [name, route] of objectIterator.entries(routes)) {
    if (!isFunction(route.default)) {
      warn(`Controller "${name}" is not a function.`)
      continue
    }

    const prefix = name !== options.indexRoute ? `/${name}` : ""

    const Ctor = route.default

    r.use(prefix, new Ctor())
  }

  return mountNonMatchedHandlers(r, options.nonMatched)
}

/**
 * Make controller function that will build routes from given directory
 *
 * @param string path
 * @param object options – is set, the Router will be returned immediately
 *
 * @return function|Router
 */
function makeRouter(path, options) {
  if (!isString(path)) {
    throw new TypeError(
      `Path parameter should be a string, but given type is ${getType(path)}`
    )
  }

  const routes = rd(path)

  const routesCreator = buildRoutes(routes)

  return options ? routesCreator(options) : routesCreator
}

export default makeRouter
