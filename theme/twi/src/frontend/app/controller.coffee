{dirname} = require "path"

fulfill = (cb) -> (component) -> cb null, component

getModule = (prefix) -> (name) -> (state, cb) ->
  System.import "module/#{prefix}/#{name}"
    .then fulfill cb
    .catch (err) -> console.error err

getPrefix = (path) -> dirname path.replace /^\.\//, ""

makeRoutes = ->
  ctx = require.context "module", yes, /\/Controller\./

  routes = for key in do ctx.keys
    controller = ctx key
    controller getModule getPrefix key

  return routes

module.exports = do ->
  path: "/"
  component: require "container/Main.cjsx"
  indexRoute:
    getComponent: getModule("home/home")("Home")
  childRoutes: do makeRoutes
