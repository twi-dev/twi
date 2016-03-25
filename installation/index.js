'use strict';

// Colors
const COLOR_DEF = '\x1b[0m';
const COLOR_RED = '\x1B[0;31m';
const COLOR_GEEN = '\x1B[0;32m';
const COLOR_BLUE = '\x1b[34;01m';
const COLOR_YELLOW = '\x1b[33;01m';
const COLOR_CYAN = '\x1b[36;01m';
const RESET = '\x1B[0m';
const BOLD = '\x1B[0;1m';

// Log levels
const LOG_NORMAL = 0;
const LOG_OK = 1;
const LOG_INFO = 2;
const LOG_WARN = 3;
const LOG_ERR = 4;

// Modules
var exec, realpath, dirname, readConfig, readlineSync;
exec = require('child_process').execSync;
realpath = require('fs').realpathSync;
dirname = require('path').dirname;
readConfig = require('node-yaml').readSync;
readlineSync = require('readline-sync');
// Root path
const __ROOT__ = dirname(__dirname);

// Variables
var aLogMessages;
aLogMessages = [
  '[' + COLOR_DEF + 'trace' + COLOR_DEF + ']',
  '[' + COLOR_GEEN + 'ok' + COLOR_DEF + ']',
  '[' + COLOR_CYAN + 'info' + COLOR_DEF + ']',
  '[' + COLOR_YELLOW + 'warn' + COLOR_DEF + ']',
  '[' + COLOR_RED + 'err' + COLOR_DEF + ']'
];

// Functions
var configure, write, writeErr, log, logLine,
installDependencies, buildBackand, buildFrontend;

write = function(str) {
  process.stdout.write(str);
};

writeErr = function(err) {
  process.stderr.write(err);
};

log = function(message, lvl) {
  lvl = lvl || 0;
  if (lvl === LOG_NORMAL || lvl === LOG_OK || lvl === LOG_INFO) {
    write(`${aLogMessages[lvl]} ${message}`);
  } else {
    writeErr(`${aLogMessages[lvl]} ${message}`);
  }
};

logLine = function(message, lvl) {
  log(`${message}\n`, lvl);
};

installDependencies = function(){
  exec('npm install', {encoding: 'utf-8', stdio: 'inherit'});
  logLine('Done without errors.', LOG_OK);
};

buildBackand = function() {
  exec('cake woona:build', {encoding: 'utf-8', stdio: 'inherit'});
};

buildFrontend = function() {
  exec('gulp', {encoding: 'utf-8', stdio: 'inherit'});
  logLine('Done without errors.', LOG_OK);
};

/**
 * Получаем конфиги
 */
configure = function() {
  const CONFIGS_ROOT = __ROOT__ + '/configs';
  var __oDefaultConfig, __oUserConfig;
  console.log(__oDefaultConfig = readConfig(CONFIGS_ROOT + '/default.config.yaml'));

  return __oDefaultConfig;
};

module.exports = function() {
  var oDatabaseConfig;
  // try {
  //   logLine('Installing dependencies...');
  //   installDependencies();

  //   logLine('Building backend...');
  //   buildBackand();

  //   logLine('Building frontend...');
  //   buildFrontend();

  //   configure();
  // } catch (err) {
  //   logLine(err, LOG_ERR);
  //   process.exit(1);
  // }

  oDatabaseConfig = configure();

  // logLine('Importing database structure...');
  // require('./migrations/database')()
  //   .then(function(){
  //     logLine('Done without errors.', LOG_OK);
  //     process.exit(0);
  //   })
  //   .catch(function(err) {
  //     logLine(err, LOG_ERR);
  //     process.exit(1);
  //   });
};