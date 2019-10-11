import {join} from "path"

import {readSync} from "node-yaml"

import merge from "lodash/merge"
import toObject from "object-deep-from-entries"

import {version, codename} from "package.json"

process.env.NODE_ENV || (process.env.NODE_ENV = "development")

const name = process.env.NODE_ENV
const dev = name !== "production"
const test = name === "test"
const debug = name === "debug"
const env = {name, dev, test, debug}

const environments = ["developments", "production", "debug", "test"]
const defaultConfig = readSync(join(__dirname, "..", "config/default"))

function readConfig(configName) {
  try {
    return readSync(join(__dirname, "..", configName)) || {}
  } catch (err) {
    if (err.code !== "ENOENT") {
      throw err
    }

    return {}
  }
}

const configs = toObject(environments.map(configName => [
  configName,

  merge({}, defaultConfig, readConfig(configName), {version, codename, env})
]))

export default configs
