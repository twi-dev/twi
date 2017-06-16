const join = require("path").join

const rd = require("require-dir")

const objectIterator = require(join(__dirname, "build/helper/objectIterator"))

function loadConfig() {
  const res = {}

  const parts = rd(join(__dirname, "build/frontend/config"))

  for (const [name, part] of objectIterator.entries(parts)) {
    res[name] = part.default || part[name] || part
  }

  return res
}

module.exports = loadConfig()
