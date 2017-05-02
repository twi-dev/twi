import {join} from "path"

import {read} from "node-yaml"
import merge from "lodash/merge"
import deepFreeze from "deep-freeze"
import isString from "lodash/isString"
import isPlainObject from "lodash/isPlainObject"

const CONFIGS_ROOT = join(process.cwd(), "config")

async function readConfig(dir, name) {
  const defaultConfig = await read(join(dir, "default.yml"))

  if (!name) {
    return defaultConfig
  }

  let config = {}
  try {
    config = await read(join(dir, `${name}.yml`))
  } catch (err) {
    if (err.code !== "ENOENT") {
      throw err
    }

    if (name === "production") {
      throw new Error(
        "Production config required." +
        `Is production.yml exists in "${dir}" directory?`
      )
    }
  }

  return merge({}, defaultConfig, config)
}

async function getConfig(serviceName, env) {
  if (!isString(serviceName)) {
    throw new TypeError("Service name should be a string.")
  }

  if (!isPlainObject(env)) {
    throw new TypeError("Env should be passed as object.")
  }

  const servicePath = join(CONFIGS_ROOT, "service", serviceName)

  const system = await readConfig(join(CONFIGS_ROOT, "system"), env.name)
  const serviceConfig = await readConfig(servicePath, env.name)

  if (process.env.NODE_ENV !== env.name) {
    process.env.NODE_ENV = env.name
  }

  return deepFreeze({...serviceConfig, env, system})
}

export default getConfig
