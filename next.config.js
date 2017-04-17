const {join} = require("path")

const rd = require("require-dir")

const objectIterator = require(
  join(__dirname, "system/helper/iterator/sync/objectIterator")
)

function loadConfig() {
  const res = {}

  const parts = rd(join(__dirname, "setup/frontend/config"))

  for (const [name, part] of objectIterator.default.entries(parts)) {
    res[name] = part.default || part[name] || part
  }

  return res
}

module.exports = loadConfig()
