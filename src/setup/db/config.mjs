import {join} from "path"

import {readSync} from "node-yaml"

import merge from "lodash/merge"
import toObject from "object-deep-from-entries"

if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = "development"
}

const environments = ["development", "production", "test"]
const defaultConfig = readSync(join(__dirname, "..", "..", "config/default"))

const normalize = ({name, user, pass, ...options}) => ({
  ...options, database: name, username: user, password: pass
})

function readConfig(configName) {
  try {
    return readSync(join(__dirname, "..", "..", "config", configName)) || {}
  } catch (err) {
    if (err.code !== "ENOENT") {
      throw err
    }

    return {}
  }
}

const config = toObject(environments.map(configName => [
  configName,

  normalize(merge({}, defaultConfig.database, readConfig(configName).database))
]))

module.exports = config
