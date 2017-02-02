{dirname} = require "path"

onFulfilled = (cb) -> (component) -> cb null, component

onRejected = (err) -> console.error err

getComponent = (path) -> (state, cb) ->
  System.import "#{path}"
    .then(onFulfilled, onRejected)

getModule = (prefix) -> (name) -> (state, cb) ->
  System.import "module/#{prefix}/#{name}"
    .then onFulfilled cb
    .catch (err) -> console.error err

getPrefix = (path) -> dirname path.replace /^\.\//, ""

makeRoutes = ->
  ctx = require.context "module", yes, /\/Controller\./

  routes = for key in do ctx.keys
    controller = ctx key
    controller getModule getPrefix key

  return routes

module.exports = do ->
  childRoutes: [{
    path: "/"
    component: require "container/Main.cjsx"
    indexRoute:
      getComponent: getModule("home/home")("Home")
      childRoutes: do makeRoutes
  }, {
    path: "*"
    component: require "view/error/http/NotFound"
  }]
