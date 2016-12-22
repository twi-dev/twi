TWI_ROOT = do process.cwd

jeet = require "jeet"
rupture = require "rupture"
poststylus = require "poststylus"
devServer = require "./helper/devServer"
WebpackPluginBabili = require "babili-webpack-plugin"

{
  DefinePlugin, HotModuleReplacementPlugin, LoaderOptionsPlugin
} = webpack = require "webpack"

{
  app: {theme}
  static: {port}
} = require "#{TWI_ROOT}/core/helper/util/configure"

webpackConfig = (isDevel = no) -> new Promise (resolve, reject) ->
  onFulfilled = (stats) -> resolve stats

  onRejected = (err) -> reject err

  fulfill = (err, stats) -> if err then onRejected err else onFulfilled stats

  process.env.NODE_ENV = if isDevel then "development" else "production"

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
        babel:
          comments: not isDevel
  ]

  entry = [
    "#{TWI_ROOT}/theme/#{theme}/src/frontend/main.jsx"
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

  babel =
    test: /\.jsx?$/
    exclude: /node_modules/
    use: [
      {
        loader: "babel-loader"
        query:
          presets: [
            "es2015"
            "react"
          ]
          plugins: [
            "transform-decorators-legacy"
            "transform-class-properties"
          ]
      }
    ]

  stylus =
    test: /\.styl$/
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
        query:
          paths: [
            "#{TWI_ROOT}/theme/#{theme}/src/stylus/common"
          ]
      }
    ]

  svg =
    test: /\.svg$/
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
  if isDevel
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

    babel.use = [
      {
        loader: "react-hot-loader"
      }
      babel.use...
    ]

    entry = [
      "
        webpack-hot-middleware/client?path=http://localhost:#{
          port
        }/__webpack_hmr&timeout=20000
      "
      entry...
    ]

  unless isDevel
    plugins = [
      plugins...
      new WebpackPluginBabili comments: off
    ]

  config = {
    plugins
    devtool: if isDevel is on then "inline-source-map" else "source-map"
    resolve:
      alias:
        decorator: "#{TWI_ROOT}/core/helper/util/decorator"
        requireDefault: "#{TWI_ROOT}/core/helper/util/requireDefault"
      modules: [
        "node_modules"
        "#{TWI_ROOT}/theme/#{theme}/src/frontend"
        "#{TWI_ROOT}/theme/#{theme}/src/stylus/common"
        "#{TWI_ROOT}/theme/#{theme}/src/svg"
      ]
      extensions: [
        ".js", ".jsx", ".json"
        ".coffee", ".cjsx", ".litcoffee", ".coffee.md"
        ".svg", ".styl"
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
        babel
      ]
    output:
      path: "#{TWI_ROOT}/public/assets/js"
      publicPath: "http://localhost:#{port}/assets/js/"
      filename: "common.js"
  }

  compiler = webpack config

  if isDevel
    server = devServer compiler,
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

module.exports = webpackConfig
