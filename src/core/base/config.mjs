import {format} from "url"
import {join} from "path"

import {readSync} from "node-yaml"

import merge from "lodash/merge"
import freeze from "js-flock/deepFreeze"

import {version, codename} from "package.json"

process.env.NODE_ENV || (process.env.NODE_ENV = "development")

const CONFIGS_ROOT = join(__dirname, "..", "..", "config")

const setUrl = ({secure, host: hostname, ...url}) => format({
  ...url, hostname, protocol: secure ? "https" : "http"
})

const name = process.env.NODE_ENV || "name"

const dev = name !== "production"
const test = name === "test"
const debug = name === "debug"

const env = {name, dev, test, debug}

const defaultConfig = readSync(join(CONFIGS_ROOT, "default"))

let envConfig = {}
try {
  envConfig = readSync(join(CONFIGS_ROOT, name))
} catch (err) {
  if (err.code !== "ENOENT") {
    throw err
  }

  if (env === "production") {
    throw new Error("Production config required in production environment.")
  }
}

const config = merge({version, codename}, defaultConfig, envConfig, {env})

config.server.url = setUrl(config.server)
config.client.url = setUrl(config.client)

export default freeze(config)
