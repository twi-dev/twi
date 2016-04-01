'use strict';

// Modules
var requireDir, Sequelize, _;

/* jshint ignore:start */
Promise = require('pinkie-promise');
/* jshint ignore:end */
Sequelize = require('sequelize');
_ = require('lodash');
requireDir = require('require-dir');

// Variables
var oTypes;

/**
 * Import sequelize data types
 * More info here: http://docs.sequelizejs.com/en/latest/api/datatypes/
 */
oTypes = {
  STRING: Sequelize.STRING,
  CHAR: Sequelize.CHAR,
  TEXT: Sequelize.TEXT,
  INTEGER: Sequelize.INTEGER,
  BIGINT: Sequelize.BIGINT,
  FLOAT: Sequelize.FLOAT,
  REAL: Sequelize.REAL,
  DOUBLE: Sequelize.DOUBLE,
  DECIMAL: Sequelize.DECIMAL,
  BOOLEAN: Sequelize.BOOLEAN, // implemented as tinyint (mysql)? Huh? o_O
  TIME: Sequelize.TIME,
  DATE: Sequelize.DATE,
  DATEONLY: Sequelize.DATEONLY,
  HSTORE: Sequelize.HSTORE, // Only for PostgreSQL (pgsql)
  JSON: Sequelize.JSON, // pgsql
  JSONB: Sequelize.JSONB, // pgsql
  NOW: Sequelize.NOW, // A default value of the current timestamp
  BLOB: Sequelize.BLOB,
  RANGE: Sequelize.RANGE, // pgsql
  UUID: Sequelize.UUID,
  UUIDV1: Sequelize.UUIDV1,
  UUIDV2: Sequelize.UUIDV2,
  VIRTUAL: Sequelize.VIRTUAL,
  ENUM: Sequelize.ENUM,
  ARRAY: Sequelize.ARRAY, // pgsql
  GEOMETRY: Sequelize.GEOMETRY, // Only available in PostgreSQL (with PostGIS) or MySQL
  GEOGRAPHY: Sequelize.GEOGRAPHY
};

// Functions
var loadStructure;

/**
 * Load database structure from ./structure directory
 *
 * @return object
 */
loadStructure = function() {
  var __oModel, __model, __ref;
  __ref = {};
  __oModel = requireDir(`${global.__ROOT__}/core/database/structure`);
  for (let __sModelName in __oModel) {
    __model = __oModel[__sModelName];
    if (_.isFunction(__model) === true) {
      __ref[__sModelName] = __model(oTypes);
    }
  }
  return __ref;
};

/**
 * Create and send database structure
 *
 * @param object oDatabaseConfig
 *
 * @return Promise
 */
module.exports = function(oDatabaseConfig) {
  return new Promise(function(_res, _rej) {
    var oConnection, aModelsPromise, __oStructure, __oModel;
    aModelsPromise = [];
    __oStructure = loadStructure();

    oConnection = new Sequelize(
      oDatabaseConfig.dbname,
      oDatabaseConfig.user,
      oDatabaseConfig.pass, {
        dialect: oDatabaseConfig.driver,
        host: oDatabaseConfig.host,
        port: oDatabaseConfig.port
      }
    );

    // Create models
    for (let __sModelName in __oStructure) {
      __oModel = __oStructure[__sModelName];
      aModelsPromise.push(
        oConnection.define(
          oDatabaseConfig.prefix + __sModelName, __oModel, {
            timestamps: false
          }
        ).sync({
          force: true
        })
      );
    }

    // Send database structure
    Promise.all(aModelsPromise)
      .then(() => _res())
      .catch((err) => _rej(err));
  });
};