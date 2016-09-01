"use strict";

/*
 * Migrate command implementation
 */

var migrate = require(".");
var logger = require("../../core/logger");
var argv = process.argv.slice(3)[0];
var IS_DATA_ONLY = argv === "data" || argv === "d" ? true : false;

function onFulfilled() {
  logger.ok("All migrations are installed");
  process.exit(0);
}

function onRejected(err) {
  logger.err(err.stack);
  process.exit(1);
}

function onSigint() {
  logger.info("Migration process has been aborted");
  process.exit(0);
}

((IS_DATA_ONLY) ? migrate.importData() : migrate())
  .then(onFulfilled, onRejected);

process.on("SIGINT", onSigint);
