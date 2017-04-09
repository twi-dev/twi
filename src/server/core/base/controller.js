import Router from "koa-router"
import rd from "require-dir"

import isPlainObject from "lodash/isPlainObject"
import isFunction from "lodash/isFunction"
import isString from "lodash/isString"
import merge from "lodash/merge"

import getType from "server/core/helper/util/getType"
import objectIterator from "server/core/helper/iterator/objectIterator"
import {router} from "server/core/helper/decorator/controller"
import {warn} from "server/core/log"

import NotFoundException from "server/core/error/http/NotFound"
import NotAllowedException from "server/core/error/http/NotAllowed"

const r = new Router()

function actionNotFound({url}) {
  throw new NotFoundException(`Page not found on route ${url}`)
}

function actionNotAllowed({method, url}) {
  throw new NotAllowedException(`Method ${method} not allowed on route ${url}`)
}

// Default options for controller
const defaults = {
  errorHandlers: {
    actionNotFound,
    actionNotAllowed
  }
}

function makeController(path, options = {}) {
  if (!isString(path)) {
    throw new TypeError(
      `Path parameter should be a string, but given type is ${getType(path)}`
    )
  }

  if (!isPlainObject(options)) {
    throw new TypeError(
      "Options for controller should be passed as plain JavaScript object, " +
      `but given value has type of ${getType(options)}. ` +
      `Check parameters in makeController invocation for path: ${path}`
    )
  }

  options = merge({}, defaults, options)

  const controllers = rd(path)

  for (const [name, controller] of objectIterator.entries(controllers)) {
    if (!isFunction(controller.default)) {
      warn(`Controller "${name}" is not a function.`)
      continue
    }

    const Ctor = router(controller.default)(`/${name}`)

    r.use(new Ctor())
  }

  const {actionNotFound, actionNotAllowed} = options.errorHandlers

  r.get("*", actionNotFound)
  r.all("*", actionNotAllowed)

  return r
}

export default makeController
