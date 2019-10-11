import {join} from "path"

import {readSync} from "node-yaml"

import merge from "lodash/merge"
import toObject from "object-deep-from-entries"

const environments = ["developments", "production", "debug", "test"]
const defaultConfig = readSync(join(__dirname, "..", "config/default"))

function readConfig(name) {
  try {
    return readSync(join(__dirname, "..", name)) || {}
  } catch (err) {
    if (err.code !== "ENOENT") {
      throw err
    }

    return {}
  }
}

const configs = environments.map(name => [
  name, merge({}, defaultConfig, readConfig(name))
])

console.log(toObject(configs))

export default toObject(configs)
