TWI_ROOT = do process.cwd

jeet = require "jeet"
rupture = require "rupture"
poststylus = require "poststylus"
isFunction = require "lodash/isFunction"

{
  app: {theme}
  static: {port}
} = require "#{TWI_ROOT}/core/helper/util/configure"

{
  DefinePlugin, HotModuleReplacementPlugin, LoaderOptionsPlugin
} = webpack = require "webpack"

AssetsPlugin = require "assets-webpack-plugin"
PluginBabili = require "babili-webpack-plugin"
ExtractTextPlugin = require "extract-text-webpack-plugin"

requireHelper = require "#{TWI_ROOT}/core/helper/require"

configure = (isDev) ->
  rules = requireHelper "./config"

  rules = for name, rule of rules
    unless isFunction rule
      throw "The rule \"#{name}\" should return a function."

    rule isDev

  plugins = [
    new AssetsPlugin path: "#{TWI_ROOT}/configs", filename: "assets.json"

    new ExtractTextPlugin
      disable: isDev
      allChunks: yes
      filename: "css/[name]-[hash].css"

    new DefinePlugin
      "process.env": NODE_ENV: JSON.stringify process.env.NODE_ENV

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

  entry =
    main: [
      "#{TWI_ROOT}/theme/#{theme}/src/frontend/main.jsx"
    ]

  if isDev
    entry.main = [
      "react-hot-loader/patch"
      "
        webpack-hot-middleware/client?path=http://localhost:#{
          port
        }/__webpack_hmr&timeout=20000
      "
      entry.main...
    ]

    plugins = [
      new HotModuleReplacementPlugin
      plugins...
    ]
  else
    plugins = [
      new PluginBabili comments: off
      plugins...
    ]

  config = {
    plugins
    devtool: if isDev then "eval" else "source-map"
    performance:
      hints: if isDev then no else "warning"
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
    module: {rules}
    entry
    output:
      path: "#{TWI_ROOT}/public/assets"
      publicPath: "http://localhost:#{port}/assets/"
      filename: "js/[name]-[hash].js"
  }

  return config

module.exports = configure
