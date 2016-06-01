'use strict';

// Modules
var model, question, logger, requireHelper, requireHelper, _;
model = require('../../core/database/index');
requireHelper = require('require-dir');
question = require('readline-sync').question;
logger = require('../../core/logger');
_ = require('lodash');

// Functions
var createSuperUser, loadSchemas, importData;

/**
 * Load database schemas
 **/
loadSchemas = (bIsForce) => {
  var oSchemas, bCreateSuperUser, __ref;

  __ref = [];
  oSchemas = requireHelper('../../core/database/schemas');

  for (let __sName in oSchemas) {
    let __schema = oSchemas[__sName];
    __ref.push(
      model(
        __sName, __schema
      ).sync({
        force: !!bIsForce
      })
    );
  }

  return __ref;
};

importData = (sPrefix) => {
  return new Promise((_res, _rej) => {
    var oDataArrays, oModelsStructure, aModelsPromise;

    oModelsStructure = {};
    aModelsPromise = [];
    oDataArrays = requireHelper('./data');

    for (let __sModelName in oDataArrays) {
      oModelsStructure[__sModelName] = require(
        `../../core/database/schemas/${__sModelName}`
      );
    }

    for (let __sModelName in oModelsStructure) {
      let __oModel = oModelsStructure[__sModelName];
      for (let oValues of oDataArrays[__sModelName]) {
        aModelsPromise.push(
          model(
            `${__sModelName}`, __oModel, {
              timestamps: false
          }).upsert(oValues) // TODO: May be I can replace this one with bulk.
        );
      }
    }

    Promise.all(aModelsPromise)
      .then(() => _res())
      .catch(err => _rej(err));
  });
};

/**
 * Create ponyFiction.js SU
 */
createSuperUser = () => {
  return new Promise((_res, _rej) => {
    var user, contacts, sUsername, sEmail, sPass;

    user = model(
      'user',
      require('../../core/database/schemas/user')
    );

    contacts = model(
      'contacts',
      require('../../core/database/schemas/contacts')
    );

    // Associate user with his contacts
    user.hasOne(contacts, {
      foreignKey: 'userId',
      as: 'contacts'
    });

    sUsername = question('Your login: ');
    sEmail = question('Your email: ');
    sPass = question('Your password: ', {
      hideEchoBack: true
    });

    user.findOrCreate({
      where: {
        role: 3
      },
      include: [{
        model: contacts,
        as: 'contacts'
      }],
      defaults: {
        login: sUsername,
        email: sEmail,
        password: require('bcryptjs').hashSync(sPass),
        registeredAt: require('moment')().format(),
        role: 3,
        status: 1
      }
    })
    .then(() => _res())
    .catch(err => _rej(err));
  });
};

module.exports = oDatabaseConfig => {
  return new Promise((_res, _rej) => {
    var bIsForce, bCreateSuperUser;

    bIsForce = question(
        'Drop and database structure? (Y/n): '
      ) || 'y';

    bIsForce = (
      bIsForce === 'y' || bIsForce === 'yes' ||
      bIsForce === 'д' || bIsForce === 'да'
    ) ? true : false;

    if (bIsForce === false) {
      bCreateSuperUser = question(
        'Create owner account? (Y/n): '
      ) || 'y';
    }

    bCreateSuperUser = (
      bCreateSuperUser === 'y' || bCreateSuperUser === 'yes' ||
      bCreateSuperUser === 'д' || bCreateSuperUser === 'да'
    ) ? true : false;

    Promise.all(loadSchemas(bIsForce))
      .then(() => importData())
      .then(() => {
        if (bIsForce === false && bCreateSuperUser === false) {
          return _res();
        }
        return createSuperUser();
      })
      .then(() => _res())
      .catch(err => _rej(err));
  });
};
