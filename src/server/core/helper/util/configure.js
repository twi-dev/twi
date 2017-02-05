import {readSync} from "node-yaml"
import merge from "lodash/merge"
import deepFreeze from "deep-freeze"

function configure() {
  const CONFIGS_ROOT = `${process.cwd()}/config/app`

  const defaultConfig = readSync(`${CONFIGS_ROOT}/default`)

  var userConfig
  try {
    userConfig = readSync(`${CONFIGS_ROOT}/user`)
  } catch (err) {
    userConfig = {}
  }

  const config = merge({}, defaultConfig, userConfig, {
    isDev: process.env.NODE_ENV !== "production" ? true : false,
    env: process.env.NODE_ENV || "development"
  })

  return deepFreeze(config)
}

module.exports = configure()
