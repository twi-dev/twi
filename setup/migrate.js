var TWI_ROOT, assign, createSu, data, db, fs, importData, isFunction, loadSchemas, locales, migrate, ora, realpathSync, redis, ref, requireHelper, schemas, shortid,
  asyncWrap = (function(){ return function(fn) { return function() { var gen = fn.apply(this, arguments); return new Promise(function(resolve, reject) { function onFulfilled(res) { try { var nextYield = gen.next(res); } catch (err) { return reject(err); } next(nextYield); } function onRejeted(err) { try { var nextYield = gen.throw(err); } catch (err) { return reject(err); } next(nextYield); } function next(nextYield) { if (nextYield.done) { return resolve(nextYield.value); } var value = nextYield.value; return Promise.resolve(value).then(onFulfilled, onRejeted); } return onFulfilled(); }); }; }; })(),
  hasProp = {}.hasOwnProperty;

fs = require("promise-fs");

db = require("../core/database");

shortid = require("shortid");

redis = require("then-redis");

requireHelper = require("../core/helper/require");

ora = require("ora")();

realpathSync = require("fs").realpathSync;

ref = require("lodash"), isFunction = ref.isFunction, assign = ref.assign;

TWI_ROOT = realpathSync(__dirname + "/../");

schemas = requireHelper(TWI_ROOT + "/core/database/schemas");

data = requireHelper(TWI_ROOT + "/migrations/data");

locales = requireHelper(TWI_ROOT + "/migrations/locales", true);


/*
 * Load all schemas to database
 *
 * @params boolean notErase
 */

loadSchemas = asyncWrap(function*(notErase) {
  var __k, __sch;
  if (notErase == null) {
    notErase = false;
  }
  ora.text = "Loading schemas...";
  for (__k in schemas) {
    if (!hasProp.call(schemas, __k)) continue;
    __sch = schemas[__k];
    if (isFunction(__sch)) {
      yield db(__k, __sch).sync({
        force: !notErase,
        logging: false
      });
    }
  }
});


/*
 * Import migrations data to database
 *
 * @param boolean notErase
 */

importData = asyncWrap(function*(notErase) {
  var __arr, __data, __id, __idx, __k, __lang, __localeData, __model, __models, __sch, __values, i, len, obj, obj1, ret;
  if (notErase == null) {
    notErase = false;
  }
  ora.text = "Importing data...";
  __models = {};
  for (__k in schemas) {
    if (!hasProp.call(schemas, __k)) continue;
    __sch = schemas[__k];
    if (!(isFunction(__sch))) {
      continue;
    }
    __model = db(__k, __sch);
    __models[__k] = __model;
    if (!notErase) {
      yield __model.destroy({
        truncate: true,
        logging: false
      });
    }
  }
  ret = {};
  for (__k in __models) {
    if (!hasProp.call(__models, __k)) continue;
    __model = __models[__k];
    if (!__k.endsWith("Locale") && ((__data = data[__k]) != null)) {
      ret[__k] = (yield __model.bulkCreate(__data, {
        logging: false,
        returning: true
      }));
    }
  }
  ora.text = "Importing data locales...";
  for (__lang in locales) {
    __localeData = locales[__lang];
    for (__k in ret) {
      __arr = ret[__k];
      if (!((__data = __localeData[__k]) != null)) {
        continue;
      }
      __model = __models[__k + "Locale"];
      for (__idx = i = 0, len = __data.length; i < len; __idx = ++i) {
        __values = __data[__idx];
        __id = __arr[__idx].dataValues[__k + "_id"];
        yield __model.findOrCreate({
          where: (
            obj = {},
            obj[__k + "Id"] = __id,
            obj.lang = __lang,
            obj
          ),
          defaults: assign({}, (
            obj1 = {},
            obj1[__k + "Id"] = __id,
            obj1.lang = __lang,
            obj1
          ), __values),
          logging: false
        });
      }
    }
  }
});


/*
 * Create super user account
 *
 * @param boolean silent
 */

createSu = function(silent) {
  if (silent == null) {
    silent = false;
  }
};

migrate = asyncWrap(function*(cmd) {
  ora.start();
  ora.color = "magenta";
  if (!cmd.S) {
    console.log("Silent mode is off");
  }
  yield loadSchemas(cmd.E);
  yield importData(cmd.E);
  ora.stop();
});

module.exports = migrate;

module.exports.importData = importData;
