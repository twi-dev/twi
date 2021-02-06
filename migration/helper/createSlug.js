const slugify = require("@sindresorhus/slugify")
const partial = require("lodash/partial")

const createSlug = partial(slugify, partial.placeholder, {
  customReplacements: [
    [":", " colon "],
    [",", " comma "],
    [".", " period "],
    ["@", " at "]
  ]
})

module.exports = createSlug
