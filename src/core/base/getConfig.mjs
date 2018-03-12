import {join} from "path"

import {read} from "node-yaml"
import merge from "lodash/merge"
import deepFreeze from "deep-freeze"
import isPlainObject from "lodash/isPlainObject"
import invariant from "@octetstream/invariant"

// eslint-disable-next-line import/no-unresolved
import {version, codename} from "../../package.json"

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

    invariant(
      env === "production",
      "Production config required. Is production.yml exists in %s directory?",
      dir
    )
  }

  return merge({}, defaultConfig, config, {version, codename})
}

async function getConfig(env) {
  invariant(!isPlainObject(env, TypeError, "Env should be passed as object."))

  if (isPlainObject(cache)) {
    return cache
  }

  let config = await readConfig(CONFIGS_ROOT, env.name)

  if (process.env.NODE_ENV !== env.name) {
    process.env.NODE_ENV = env.name
  }

  config = deepFreeze({...config, env})

  cache = config // Cache an app configuration

  return config
}

export default getConfig
