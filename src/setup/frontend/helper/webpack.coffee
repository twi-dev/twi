webpack = require "webpack"
{dirname} = require "path"
{isArray, isEmpty} = require "lodash"
{log} = require "gulp-util"

assign = Object.assign

TWI_ROOT = dirname module.parent.filename

defaults =
  devtool: "#inline-source-map"
  plugins: []
  theme: "twi"

webpackWrapepr = (globs, dest = "", opts) -> new Promise (resolve, reject) ->
  throw new TypeError "Globs cannot be empty." if isEmpty globs

  globs = [globs] unless isArray globs
  {devtool, isDevel, theme, plugins} = opts = assign {}, opts, defaults

  THEME_PATH = "#{TWI_ROOT}/themes/#{theme}"

  config = {
    devtool
    watch: !!isDevel
    entry: [
      globs...
    ]
    plugins
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
      path: dest
  }

  fulfill = (err = null, stats) ->
    if err? then reject err else log "Webpack stats:\n#{stats}"; do resolve

  webpack config
    .run fulfill

module.exports = webpackWrapepr
