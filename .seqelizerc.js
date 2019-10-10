const {join} = require("path")

module.exports = {
  // TODO: Add a separate database config loader to setup
  // config: join(__dirname, "setup", "config"),
  "models-path": join(__dirname, "model"),
  "seeders-path": join(__dirname, "setup", "db", "seeder"),
  "migrations-path": join(__dirname, "setup", "db", "migration")
}
