
webpack = require "webpack"
{merge} = require "lodash"
{dirname} = require "path"
{app: {theme}} = require "../../core/helper/configure"

TWI_ROOT = dirname module.parent.filename
THEME_PATH = "#{TWI_ROOT}/themes/#{theme}"

config =
  verbose: on
  plugins: [
    new webpack.HotModuleReplacementPlugin
  ]
  module:
    loaders: [
      {
        test: /\.jsx?/
        loader: "babel"
        exclude: /node_modules/
        query:
          presets: ["react"]
      }
      {
        test: /\.(cjsx|coffee|litcoffee|coffee\.md)$/
        loaders: ["coffee","cjsx"]
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
