
webpack = require "webpack"
{merge} = require "lodash"
{dirname} = require "path"
{app: {theme}} = require "../../core/helper/configure"

TWI_ROOT = dirname module.parent.filename

config =
  plugins: [
    new webpack.HotModuleReplacementPlugin
  ]
  module:
    loaders: [
      {
        test: /\.(cjsx|coffee|litcoffee|coffee\.md)$/
        loaders: ["coffee", "cjsx"]
      }
      {
        test: /\.svg$/
        loader: "svg-react"
      }
    ]
  resolve:
    root: "#{TWI_ROOT}/themes/#{theme}/src/coffee"
    extensions: [
      "", ".js", ".cjsx", ".coffee", ".litcoffee", ".coffee.md", ".svg"
    ]
  resolveLoader:
    modulesDirectories: ["node_modules"]
  output:
    filename: "common.js"

module.exports = (isDevel) -> config
