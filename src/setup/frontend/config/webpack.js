import {resolve} from "path"

import {optimize} from "webpack"

import rd from "require-dir"
import BabiliWebpackPlugin from "babili-webpack-plugin"

import objectIterator from "system/helper/iterator/sync/objectIterator"

function getRules(options) {
  const res = []

  const rules = rd(resolve(__dirname, "..", "rule"))

  for (const val of objectIterator(rules)) {
    res.push(val.default(options))
  }

  return res
}

function webpack(cfg, {dev}) {
  const rules = getRules({isDev: dev})

  cfg.plugins = cfg.plugins.map(
    p => p instanceof optimize.UglifyJsPlugin ? new BabiliWebpackPlugin() : p
  )

  cfg.resolveLoader.alias = {
    "transform-file-loader": resolve(
      __dirname, "..", "loader/transform-file-loader"
    )
  }

  cfg.resolve.extensions = [".js", ".jsx", ".json"]

  cfg.resolve.modules.push(resolve(__dirname, "..", "..", "frontend"))

  cfg.module.rules.push(...rules)

  return cfg
}

export default webpack
