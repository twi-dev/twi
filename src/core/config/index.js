import {join} from "path"

import {readSync} from "node-yaml"

import merge from "lodash/merge"
import freeze from "js-flock/deepFreeze"
import invariant from "@octetstream/invariant"

const {version, codename} = require(join("..", "..", "package.json"))

const CONFIGS_ROOT = join(__dirname, "..", "..", "config/system")

function configure() {
  const name = process.env.NODE_ENV || "name"

  const dev = name !== "production"
  const test = name === "test"
  const debug = name === "debug"

  invariant(
    ["production", "development", "test", "debug"].includes(name) === false,
    "Unknown environment name is set: %s", name
  )

  const env = {name, dev, test, debug}

  const defaultConfig = readSync(join(CONFIGS_ROOT, "default"))

  let envConfig = {}
  try {
    envConfig = readSync(join(CONFIGS_ROOT, name))
  } catch (err) {
    if (err.code !== "ENOENT") {
      throw err
    }

    invariant(
      env === "production",
      "Production config required for current (%s) environment.",
      name
    )
  }

  return freeze(merge({version, codename}, defaultConfig, envConfig, {env}))
}

export default configure()
