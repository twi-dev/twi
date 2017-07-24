import {join} from "path"

import {read} from "node-yaml"
import merge from "lodash/merge"
import deepFreeze from "deep-freeze"
import isPlainObject from "lodash/isPlainObject"

const CONFIGS_ROOT = join(process.cwd(), "config", "system")

let cache = null

async function readConfig(dir, env) {
  const defaultConfig = await read(join(dir, "default.yml"))

  let config = {}
  try {
    config = await read(join(dir, `${env}.yml`))
  } catch (err) {
    if (err.code !== "ENOENT") {
      throw err
    }

    if (env === "production") {
      throw new Error(
        "Production config required. " +
        `Is production.yml exists in "${dir}" directory?`
      )
    }
  }

  return merge({}, defaultConfig, config)
}

async function getConfig(env) {
  if (!isPlainObject(env)) {
    throw new TypeError("Env should be passed as object.")
  }

  if (isPlainObject(cache)) {
    return cache
  }

  let config = await readConfig(CONFIGS_ROOT, env.name)

  if (process.env.NODE_ENV !== env.name) {
    process.env.NODE_ENV = env.name
  }

  config = deepFreeze({...config, env})

  cache = config // Add a config to cache

  return config
}

export default getConfig
