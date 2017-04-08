import Router from "app/core/base/Router"
import * as view from "app/core/base/view"

// Decorators
const route = path => (target, key, descriptor) => {
  if (!(target.prototype[Router.symbol] instanceof Router)) {
    target.prototype[Router.symbol] = new Router()
  }

  target.prototype[Router.symbol].use(path, descriptor.value)
}

// Errors
const errorsRoutes = {
  path: "*",
  getComponent: (state, cb) => {}
}

// Routes collector
function makeRoutes() {
  const ext = /\.jsx?$/

  const controllers = require.context("app/controller", false, /\.jsx?$/)
    .filter(controller => ext.test(controller)) // filter files
    .keys()

  const routes = {}

  for (const [name, controller] of controllers.entries()) {
    const Ctor = controller.default

    const c = new Ctor()
  }

  return {
    childRoutes: [routes, errorsRoutes]
  }
}

export default makeRoutes
