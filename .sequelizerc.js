const {resolve} = require("path")

module.exports = {
  config: "migration/config.js",
  "models-path": resolve("model"),
  "seeders-path": resolve("migration", "seed"),
  "migrations-path": resolve("migration", "schema")
}
