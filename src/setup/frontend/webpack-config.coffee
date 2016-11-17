
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
        test: /\.svg$/
        loaders: ["babel", "react-svg"]
      }
      {
        test: /\.(cjsx|coffee|litcoffee|coffee\.md)$/
        loaders: ["coffee", "cjsx"]
      }
    ]
  resolve:
    root: ["#{THEME_PATH}/src/coffee", "#{THEME_PATH}/src/svg"]
    extensions: [
      "", ".js", ".cjsx", ".coffee", ".litcoffee", ".coffee.md", ".svg"
    ]
  resolveLoader:
    modulesDirectories: ["node_modules"]
  output:
    filename: "common.js"

module.exports = config
