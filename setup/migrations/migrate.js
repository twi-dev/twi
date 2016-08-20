'use strict';

/*
 * Migrate command implementation
 */

var migrate = require('.');
var logger = require('../../core/logger');
var argv = process.argv.slice(3)[0];
var IS_DATA_ONLY = argv === 'data' || argv === 'd' ? true : false;

((IS_DATA_ONLY) ? migrate.importData() : migrate())
  .then(() => {
    logger.ok('All migrations are installed');
    process.exit(0);
  })
  .catch(err => {
    logger.err(err.stack);
    process.exit(1);
  });

process.on('SIGINT', () => {
  logger.info('Migration process has been aborted');
  process.exit(0);
});
