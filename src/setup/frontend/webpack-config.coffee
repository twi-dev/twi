{merge} = require "lodash"
{dirname} = require "path"
{app: {theme}} = require "../../core/helper/configure"
{HotModuleReplacementPlugin} = webpack = require "webpack"

server = require "./helper/server"

TWI_ROOT = dirname module.parent.filename
THEME_PATH = "#{TWI_ROOT}/themes/#{theme}"

config =
  # watch: on
  devtool: "#inline-source-map"
  # entry: [
  #   "webpack-dev-server/client?http://0.0.0.0:8080"
  #   "webpack/hot/only-dev-server"
  # ]
  plugins: [
    # new HotModuleReplacementPlugin
  ]
  module:
    loaders: [
      {
        test: /\.(cjsx|coffee|litcoffee|coffee\.md)$/
        loaders: ["react-hot-loader/webpack", "coffee", "cjsx"]
      }
      {
        test: /\.json$/
        loader: "json"
      }
      {
        test: /\.svg$/
        loader: "react-svg?es5=1"
      }
    ]
  resolve:
    root: [
      "#{THEME_PATH}/src/coffee", "#{THEME_PATH}/public"
    ]
    extensions: [
      "", ".js", ".cjsx", ".coffee", ".litcoffee", ".coffee.md", ".svg"
    ]
  resolveLoader:
    modulesDirectories: ["node_modules"]
  output:
    filename: "common.js"

module.exports = config
