TWI_ROOT = do process.cwd

jeet = require "jeet"
rupture = require "rupture"
poststylus = require "poststylus"
devServer = require "./helper/devServer"

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
    new DefinePlugin
      "process.env":
        NODE_ENV:
          JSON.stringify process.env.NODE_ENV

    new LoaderOptionsPlugin
      options:
        stylus:
          "include css": on
          use: [
            do jeet
            do rupture
            poststylus [
              "autoprefixer"
            ]
          ]
  ]

  entry = [
    "#{TWI_ROOT}/theme/#{theme}/src/coffee/main.coffee"
  ]

  coffee =
    test: /\.(cjsx|coffee|litcoffee|coffee\.md)$/
    exclude: /node_modules/
    use: [
      {
        loader: "coffee"
      }
      {
        loader: "cjsx"
      }
    ]

  stylus =
    test: /\.styl/
    exclude: /node_modules/
    use: [
      {
        loader: "style-loader"
      }
      {
        loader: "css-loader"
        query:
          modules: yes
          camelCase: yes
          localIdentName: "[path][name]--[local]-[hash:base64:10]"
      }
      {
        loader: "stylus-loader"
      }
    ]

  svg =
    test: /\.svg/
    exclude: /node_modules/
    use: [
      {
        loader: "babel-loader"
        query:
          presets: [
            "es2015"
            "react"
          ]
      }
      {
        loader: "react-svg-loader"
      }
    ]

  # Add development plugins
  if isDevel is on
    plugins = [
      plugins...
      new HotModuleReplacementPlugin
    ]

    coffee.use = [
      {
        loader: "react-hot-loader"
      }
      coffee.use...
    ]

    entry = [
      "
        webpack-hot-middleware/client?path=http://localhost:#{
          port
        }/__webpack_hmr&timeout=20000
      "
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
        "#{TWI_ROOT}/theme/#{theme}/src/svg"
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
        svg
        stylus
        coffee
      ]
    output:
      path: "#{TWI_ROOT}/theme/#{theme}/public/assets/js"
      publicPath: "http://localhost:#{port}/assets/js/"
      filename: "common.js"
  }

  compiler = webpack config

  if isDevel
    server = devServer compiler,
      contentBase: "#{TWI_ROOT}/theme/#{theme}/public"
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

module.exports = webpackConfig
