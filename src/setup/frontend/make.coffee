webpack = require "webpack"

TWI_ROOT = do process.cwd

config =
  stats: "errors-only"

module.exports = webpack config
