const {join} = require("path")

const {readFile} = require("promise-fs")

const normalize = require("./normalizeCategory")

async function loadCategories() {
  const categories = await readFile(
    join(__dirname, "..", "data", "categories.json")
  )

  return JSON.parse(categories).map(normalize)
}

module.exports = loadCategories
