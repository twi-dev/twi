import Router from "koa-router"
import rd from "require-dir"

import isFunction from "lodash/isFunction"
import objectIterator from "server/core/helper/iterator/objectIterator"
import route from "server/core/helper/decorator/route"
import {warn} from "server/core/log"

const CONTROLLERS_ROOT = `${process.cwd()}/server/controller`

const r = new Router()

function controller() {
  const controllers = rd(CONTROLLERS_ROOT)

  for (const [name, controller] of objectIterator.entries(controllers)) {
    if (!isFunction(controller.default)) {
      warn(`Controller "${name}" is not a function.`)
      continue
    }

    r.use(new (route(name)(controller.default)))
  }

  return r
}

export default controller()
