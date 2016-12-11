TWI_ROOT = do process.cwd
WebpackDevServer = require "webpack-dev-server"

{
  DefinePlugin, HotModuleReplacementPlugin, LoaderOptionsPlugin
} = webpack = require "webpack"

{
  app: {theme}
  static: {port}
} = require "#{TWI_ROOT}/core/helper/util/configure"

theme or= "twi"

webpackConfig = (isDevel = no) -> new Promise (resolve, reject) ->
  onFulfilled = (stats) -> resolve stats

  onRejected = (err) -> reject err

  fulfill = (err, stats) -> if err then onRejected err else onFulfilled stats

  process.env.NODE_ENV or= if isDevel then "development" else "production"

  plugins = [
    new DefinePlugin "process.env": NODE_ENV: JSON.stringify process.env.NODE_ENV
  ]

  entry = [
    "#{TWI_ROOT}/theme/#{theme}/src/coffee/main.coffee"
  ]

  coffee =
    test: /\.(cjsx|coffee|litcoffee|coffee\.md)$/
    use: [
      {
        loader: "coffee"
      }
      {
        loader: "cjsx"
      }
    ]

  # poststylus

  # Add development plugins
  if isDevel is on
    plugins.push new HotModuleReplacementPlugin

    entry = [
      "webpack-dev-server/client?http://localhost:#{port}"
      "webpack/hot/only-dev-server"
      entry...
    ]

  config = {
    plugins
    devtool: if isDevel is on then "inline-source-map" else "source-map"
    resolve:
      alias:
        decorator: "#{TWI_ROOT}/core/helper/util/decorator"
      modules: [
        "node_modules"
        "#{TWI_ROOT}/theme/#{theme}/src/coffee"
      ]
      extensions: [
        ".coffee", ".cjsx", ".litcoffee", ".coffee.md"
        ".svg", ".styl", ".js", ".jsx", ".json"
      ]
    resolveLoader:
      alias:
        cjsx: "#{TWI_ROOT}/setup/frontend/loader/cjsx-loader"
        coffee: "#{TWI_ROOT}/setup/frontend/loader/coffee-loader"
    entry
    module:
      rules: [
        coffee
      ]
    output:
      path: "#{TWI_ROOT}/theme/#{theme}/public/assets/js"
      filename: "common.js"
  }

  if isDevel is on
    config.devServer =
      contentBase: "#{TWI_ROOT}/theme/#{theme}/public"
      hot: on
      inline: on

  compiler = webpack config

  if isDevel is on
    server = new WebpackDevServer compiler,
      contentBase: "#{TWI_ROOT}/theme/#{theme}/public"
      publicPath: "/assets/js/"
      hot: on, inline: on, historyApiFallback: on

    return server.listen port

  return compiler.run fulfill

module.exports = webpackConfig
