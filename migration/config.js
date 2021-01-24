const loadConfig = require("./helper/loadConfig")

const base = ".env"
const names = ["production", "development", "test"]

const defaultConfig = {
  ...loadConfig(base), ...loadConfig(`${base}.local`)
}

const configs = {}
for (const name of names) {
  const {
    DATABASE_HOST: host = null,
    DATABASE_PORT: port = null,
    DATABASE_USER: username = null,
    DATABASE_PASSWORD: password = null,
    DATABASE_NAME: database = null,
    DATABASE_DIALECT: dialect = null
  } = {
    ...defaultConfig,
    ...loadConfig(`${base}.${name}`),
    ...loadConfig(`${base}.${name}.local`)
  }

  configs[name] = {
    host,
    port,
    username,
    password,
    database,
    dialect
  }
}

module.exports = configs
