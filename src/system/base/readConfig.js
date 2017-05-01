import {join} from "path"

import {read} from "node-yaml"
import merge from "lodash/merge"
import deepFreeze from "deep-freeze"

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
    if (name === "production") {
      throw new Error(
        "Production config required.\n" +
        `Is production.yml exists in "${dir}" directory?`
      )
    }
  }

  return merge({}, defaultConfig, config)
}

async function getConfig(serviceName, env) {
  const servicesPath = join(CONFIGS_ROOT, "service", serviceName)

  const base = readConfig(join(CONFIGS_ROOT, "base", "default"), env.name)
  const serviceConfig = readConfig(servicesPath, env.name)

  if (process.env.NODE_ENV !== env.name) {
    process.env.NODE_ENV = env.name
  }

  return deepFreeze({env, base, [serviceName]: serviceConfig})
}

export default getConfig
