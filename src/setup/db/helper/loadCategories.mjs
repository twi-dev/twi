import {join} from "path"

import {readFile} from "promise-fs"

import waterfall from "core/helper/array/runWaterfall"

import normalize from "setup/db/helper/normalizeCategory"

const loadCategories = () => waterfall([
  () => readFile(join(__dirname, "..", "data", "categories.json")),

  content => JSON.parse(content),

  list => list.map(normalize)
])

export default loadCategories
