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
var exec, realpath, dirname, readlineSync, oConfigPhrases;
exec = require('child_process').execSync;
realpath = require('fs').realpathSync;
dirname = require('path').dirname;

// Root path
const __ROOT__ = global.__ROOT__ = dirname(__dirname);

// Variables
var aLogMessages;
aLogMessages = [
  '[' + COLOR_DEF + 'log' + COLOR_DEF + ']',
  '[' + COLOR_GEEN + 'ok' + COLOR_DEF + ']',
  '[' + COLOR_CYAN + 'info' + COLOR_DEF + ']',
  '[' + COLOR_YELLOW + 'warn' + COLOR_DEF + ']',
  '[' + COLOR_RED + 'err' + COLOR_DEF + ']'
];

oConfigPhrases = {
  app: {
    name: "Название приложения",
    host: "Адрес хоста",
    port: "Номер порта",
    workers: "Количество воркеров приложения"
  },
  database: {
    driver: "СУБД",
    host: "Адрес хоста",
    port: "Порт",
    user: "Имя пользователя",
    pass: "Пароль",
    dbname: "Имя базы данных",
    prefix: "Префикс таблиц"
  }
};

// Functions
var configure, setUserConfig, question, write, writeErr, log, logLine,
installDependencies, buildBackand, buildFrontend;

write = (str) => process.stdout.write(str);

writeErr = (err) => process.stderr.write(err);

log = (message, lvl) => {
  lvl = lvl || 0;
  if (lvl === LOG_NORMAL || lvl === LOG_OK || lvl === LOG_INFO) {
    write(`${aLogMessages[lvl]} ${message}`);
  } else {
    writeErr(`${aLogMessages[lvl]} ${message}`);
  }
};

logLine = (message, lvl) => log(`${message}\n`, lvl);

installDependencies = () => {
  exec('npm install', {
    encoding: 'utf-8',
    stdio: 'inherit'
  });
  logLine('Done without errors.', LOG_OK);
};

buildBackand = () => {
  exec('icake build', {
    encoding: 'utf-8',
    stdio: 'inherit'
  });
};

buildFrontend = () => {
  exec('gulp', {
    encoding: 'utf-8',
    stdio: 'inherit'
  });
  logLine('Done without errors.', LOG_OK);
};

/**
 * Just wrapper for readlineSync.question
 *
 * @param string sQuestion
 * @param boolean bUseMask
 *
 * @return mixed
 **/
question = (sQuestion, bUseMask) => {
  const readlineSync = require('readline-sync');
  return readlineSync.question(
    `${aLogMessages[LOG_NORMAL]} ${sQuestion}: `, {
      hideEchoBack: !!bUseMask || false
    }
  );
};

/**
 * Set user config
 *
 * @param object oDefaultConfig
 * @param string __sParentKey (do not set this param!)
 *
 * @return object
 */
setUserConfig = (oDefaultConfig, __sParentKey) => {
  var __ref, __mValue, __sAnswer, isEmpty;
  isEmpty = require('lodash').isEmpty;
  __ref = {};

  for (let __sKey in oDefaultConfig) {
    __mValue = oDefaultConfig[__sKey];
    if (typeof __mValue === 'object' && __mValue !== null) {
      __ref[__sKey] = setUserConfig(__mValue, __sKey);
      if (isEmpty(__ref[__sKey])) {
        delete __ref[__sKey];
      }
    } else {
      if (__sKey === 'xPoweredBy') {
        continue;
      }

      __sAnswer = question(
        oConfigPhrases[__sParentKey][__sKey],
        (__sKey === 'pass') ? true : false
      ) || null;

      if (__sAnswer === null) {
        continue;
      }

      __ref[__sKey] = __sAnswer;
    }
  }

  return __ref;
};

/**
 * Configure app
 *
 * @return object
 */
configure = () => {
  const CONFIGS_ROOT = __ROOT__ + '/configs';
  var __oDefaultConfig, __oUserConfig, __sAnswer, yaml, isEmpty;
  yaml = require('node-yaml');
  isEmpty = require('lodash').isEmpty;
  __oDefaultConfig = yaml.readSync(CONFIGS_ROOT + '/default.config.yaml');

  while (true) {
    __sAnswer = question('Сконфигурировать приложение сейчас? (Y/n)')
      .toLowerCase() || null;
    if (__sAnswer === 'n' || __sAnswer === 'no' ||
        __sAnswer === 'н' || __sAnswer === 'нет') {
      __oUserConfig = yaml.readSync(`${CONFIGS_ROOT}/user.config.yaml`);
      break;
    }

     __oUserConfig = setUserConfig(__oDefaultConfig);
    logLine('Ваш конфиг:');
    console.log(__oUserConfig);
    __sAnswer = question('Всё верно? (Y/n)').toLowerCase() || null;

    if (__sAnswer === 'y' || __sAnswer === 'yes' ||
        __sAnswer === 'д' || __sAnswer === 'да' ||
        __sAnswer === null) {
      break;
    }
  }

  if (!isEmpty(__oUserConfig)) {
    yaml.writeSync(
      `${CONFIGS_ROOT}/user.config.yaml`,
      __oUserConfig
    );
    logLine('Конфиг записан в:', LOG_INFO);
    logLine(`${CONFIGS_ROOT}/user.config.yaml`, LOG_INFO);
  }

  return require('lodash').merge(__oDefaultConfig, __oUserConfig);
};

(() => {
  var __oDatabaseConfig;
  try {
    logLine('Установка зависимостей...');
    installDependencies();

    logLine('Сборка движка...');
    buildBackand();

    logLine('Сборка фронтенда...');
    buildFrontend();

    __oDatabaseConfig = configure().database;
  } catch (err) {
    logLine(err, LOG_ERR);
    logLine(err.stack, LOG_ERR);
    process.exit(1);
  }

  logLine('Importing database structure...');
  require('./migrations/database')(
    __oDatabaseConfig
  ).then(() => {
    logLine('Done without errors.', LOG_OK);
    process.exit(0);
  })
  .catch((err) => {
    logLine(err, LOG_ERR);
    logLine(err.stack, LOG_ERR);
    process.exit(1);
  });
})();
