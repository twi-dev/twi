const {join} = require("path")

const rd = require("require-dir")
const UglifyJsPlugin = require("webpack").optimize.UglifyJsPlugin
const BabiliWebpackPlugin = require("babili-webpack-plugin")

const objectIterator = require(
  join(__dirname, "system/helper/iterator/sync/objectIterator")
)

function getRules(options) {
  const res = []

  const rules = rd(join(__dirname, "setup/frontend/rule"))

  for (const val of objectIterator.default(rules)) {
    res.push(val.default(options))
  }

  return res
}

function webpack(cfg, {dev}) {
  const rules = getRules({isDev: dev})

  cfg.plugins = cfg.plugins.map(
    p => p instanceof UglifyJsPlugin ? new BabiliWebpackPlugin() : p
  )

  cfg.resolveLoader.alias = {
    "transform-file-loader": (
      `${__dirname}/setup/frontend/loader/transform-file-loader`
    )
  }

  cfg.resolve.extensions = [".js", ".jsx", ".json"]

  cfg.resolve.modules.push(join(__dirname, "frontend"))

  cfg.module.rules.push(...rules)

  return cfg
}

module.exports = {
  webpack
}
