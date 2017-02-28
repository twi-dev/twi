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

  const env = process.env.NODE_ENV || "development"
  const debug = env === "debug"
  const test = env === "test"
  const isDev = env !== "production"

  const config = merge({}, defaultConfig, userConfig, {
    env, isDev, debug, test
  })

  return deepFreeze(config)
}

module.exports = configure()
