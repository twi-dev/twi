TWI_ROOT = do process.cwd

jeet = require "jeet"
webpack = require "webpack"
rupture = require "rupture"
poststylus = require "poststylus"
createDevServer = require "./devServer"

{
  app: {theme}
  static: {port}
} = require "#{TWI_ROOT}/core/helper/util/configure"

confugure = require "./configure"

createCompiler = (isDev = no) -> new Promise (resolve, reject) ->
  fulfill = (err, stats) -> if err then reject err else resolve stats

  process.env.NODE_ENV = if isDev then "development" else "production"

  config = confugure isDev

  compiler = webpack config

  if isDev
    server = createDevServer compiler,
      contentBase: "#{TWI_ROOT}/public"
      devMiddleware:
        hot: on
        lazy: no
        publicPath: config.output.publicPath
        stats:
          colors: on
      hotMiddleware:
        path: "/__webpack_hmr"
        heartbeat: 10 * 1000
        log: console.log

    return server.listen port

  return compiler.run fulfill

module.exports = createCompiler
