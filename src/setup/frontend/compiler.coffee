TWI_ROOT = do process.cwd

jeet = require "jeet"
rupture = require "rupture"
poststylus = require "poststylus"
createDevServer = require "./helper/devServer"
WebpackPluginBabili = require "babili-webpack-plugin"

{
  DefinePlugin, HotModuleReplacementPlugin, LoaderOptionsPlugin
} = webpack = require "webpack"

{
  app: {theme}
  static: {port}
} = require "#{TWI_ROOT}/core/helper/util/configure"

webpackConfig = (isDev = no) -> new Promise (resolve, reject) ->
  onFulfilled = (stats) -> resolve stats

  onRejected = (err) -> reject err

  fulfill = (err, stats) -> if err then onRejected err else onFulfilled stats

  process.env.NODE_ENV = if isDev then "development" else "production"

  plugins = [
    new DefinePlugin
      "process.env":
        NODE_ENV: JSON.stringify process.env.NODE_ENV

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
          comments: not isDev
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
            "transform-flow-strip-types"
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
          localIdentName: "[name]__[local]___[hash:base64:10]"
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
  if isDev
    plugins = [
      plugins...
      new HotModuleReplacementPlugin
    ]

    coffee.use = [
      {
        loader: "react-hot-loader/webpack"
      }
      coffee.use...
    ]

    babel.use = [
      {
        loader: "react-hot-loader/webpack"
      }
      babel.use...
    ]

    entry = [
      "react-hot-loader/patch"
      "
        webpack-hot-middleware/client?path=http://localhost:#{
          port
        }/__webpack_hmr&timeout=20000
      "
      entry...
    ]

  unless isDev
    plugins = [
      plugins...
      new WebpackPluginBabili comments: off
    ]

  config = {
    plugins
    devtool: if isDev is on then "eval" else "source-map"
    performance:
      hints: not isDev
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
        ".coffee", ".cjsx", ".litcoffee", ".coffee.md"
        ".js", ".jsx", ".json"
        ".svg", ".styl"
      ]
    resolveLoader:
      alias:
        cjsx: "#{TWI_ROOT}/setup/frontend/loader/cjsx-loader"
        coffee: "#{TWI_ROOT}/setup/frontend/loader/coffee-loader"
    module:
      rules: [
        svg
        stylus
        coffee
        babel
      ]
    entry
    output:
      path: "#{TWI_ROOT}/public/assets/js"
      publicPath: "http://localhost:#{port}/assets/js/"
      filename: "common.js"
  }

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

module.exports = webpackConfig
