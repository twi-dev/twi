var db, fs, importData, migrate, requireHelper;

fs = require("promise-fs");

db = require("../core/database");

requireHelper = require("../core/helper/require");

importData = function(clean) {
  if (clean == null) {
    clean = false;
  }
};

migrate = function(clean) {
  if (clean == null) {
    clean = false;
  }
  return console.log("migrate");
};

module.exports = migrate;
