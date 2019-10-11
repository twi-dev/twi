const {join} = require("path")

module.exports = {
  config: join(__dirname, "setup", "config.js"),
  "models-path": join(__dirname, "model"),
  "seeders-path": join(__dirname, "setup", "db", "seeder"),
  "migrations-path": join(__dirname, "setup", "db", "migration")
}
