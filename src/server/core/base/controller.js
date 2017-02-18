import Router from "koa-router"
import rd from "require-dir"

import isFunction from "lodash/isFunction"
import objectIterator from "server/core/helper/iterator/objectIterator"
import {router} from "server/core/helper/decorator/controller"
import {warn} from "server/core/log"

const CONTROLLERS_ROOT = `${process.cwd()}/server/controller`

const r = new Router()

const actionNotFound = ctx => ctx.body = "Page Not found"

const actionNotAllowed = ctx => ctx.body = "Method Not Allowed"

function controller() {
  const controllers = rd(CONTROLLERS_ROOT)

  for (const [name, controller] of objectIterator.entries(controllers)) {
    if (!isFunction(controller.default)) {
      warn(`Controller "${name}" is not a function.`)
      continue
    }

    const Ctor = router(controller.default)(`/${name}`)

    r.use(new Ctor)
  }

  r.get("*", actionNotFound)
  r.all("*", actionNotAllowed)

  return r
}

export default controller()
