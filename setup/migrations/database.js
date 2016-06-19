'use strict';

// Modules
// var model, question, logger, requireHelper, requireHelper, _;
const model = require('../../core/database/index');
const requireHelper = require('../../core/helpers/require-helper');
const question = require('readline-sync').question;
const logger = require('../../core/logger');
const _ = require('lodash');

// Functions
var createSuperUser, loadSchemas, importData;

/**
 * Load database schemas
 **/
loadSchemas = bIsForce => {
  var oSchemas, bCreateSuperUser, __ref;

  __ref = [];
  oSchemas = requireHelper('../../core/database/schemas');

  for (let __sName in oSchemas) {
    let __schema = oSchemas[__sName];

    if (_.isFunction(__schema) === false) {
      logger.warn(`Schema "${__sName}" is not a function.`);
      continue;
    }

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

/**
 * Importing data
 */
importData = () => {
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
          }).upsert(oValues) // TODO: Maybe I can replace this one with bulk.
        );
      }
    }

    Promise.all(aModelsPromise)
      .then(() => _res())
      .catch(err => _rej(err));
  });
};

/**
 * Create owner account
 */
createSuperUser = () => {
  return new Promise((_res, _rej) => {
    var user, contacts, sUsername, sEmail, sPass;
    const validationHelper = require('../../core/helpers/validation-helper');

    user = model(
      'user',
      require('../../core/database/schemas/user')
    );

    contacts = model(
      'contacts',
      require('../../core/database/schemas/contacts')
    );

    while (true) {
      sUsername = question('Your login: ');

      // Checking login
      if (validationHelper.isValidLogin(sUsername)) break;

      logger.warn(
        'Username may contain only letters, digits, underscores and dots.'
      );
    }

    while(true) {
      sEmail = question('Your email: ');

      // Checking email
      if (validationHelper.isEmail(sEmail)) break;

      logger.warn('Wrong email format.');
    }

    while (true) {
      let sRepass;

      sPass = question('Your password: ', {
        hideEchoBack: true
      });

      sRepass = question('Repeat your password: ', {
        hideEchoBack: true
      });

      // Checking password
      if (validationHelper.isValidPassword(sPass) && sPass === sRepass) break;

      logger.err('Passwords are not equal.');
    }

    user.find({
      where: {
        role: 3
      }
    })
    .then(oUser => {
      if (_.isEmpty(oUser) === false) {
        logger.info('Owner account is already exists.');
        return _res();
      }

      return contacts.create();
    })
    .then(oContact =>
      user.create({
        login: sUsername,
        email: sEmail,
        password: require('bcryptjs').hashSync(sPass),
        registeredAt: require('moment')().format(),
        role: 3,
        status: 1,
        contactsId: oContact.get({plain: true}).contactsId
      })
    )
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
