"use strict";

// Modules
var model = require("../../core/database/index");
var requireHelper = require("../../core/helper/require");
var question = require("readline-sync").question;
var logger = require("../../core/logger");
var co = require("co");
var fs = require("co-fs");
var _ = require("lodash");

// Functions
var createSuperUser, loadSchemas;

/**
 * Load database schemas
 **/
loadSchemas = bIsForce => {
  var oSchemas, __ref;

  __ref = [];
  oSchemas = requireHelper("../../core/database/schemas");

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
function importData() {
  return co(function* () {
    var langs, dataCollection, schemas = {};

    langs = yield fs.readdir(__dirname + "/locales");
    dataCollection = requireHelper("./data");
    for (let __name in dataCollection) {
      schemas[__name] = require(`../../core/database/schemas/${__name}`);
    }

    for (let __name in schemas) {
      if (__name === `${__name}Locale`) continue; // Just skip locale models...

      let __model = model(__name, schemas[__name], {timestamps: false});
      let __data = [];

      // Clean nodels before import data
      yield __model.destroy({truncate: true});

      // Import data
      for (let __values of dataCollection[__name]) {
        __data.push((yield __model.create(__values)).get({plain: true}));
      }

      // Get locales content (if locales exists)
      for (let __lang of langs) {
        try {
          let __content = require(`${__dirname}/locales/${__lang}/${__name}`);
          let __localeModel = model(`${__name}Locale`, require(
            `../../core/database/schemas/${__name}Locale`, {
              timestamps: false
            }
          ));

          // Importing locales
          for (let __index in __content) {
            let __obj = {};
            let __values = __content[__index];
            __obj[`${__name}Id`] = __data[__index][`${__name}Id`];
            yield __localeModel.create(_.assign(
              __obj, {lang: __lang}, __values
            ));
          }
        } catch (err) {
          if (err.code !== "ENOENT") {
            logger.err(err.stack);
            process.exit(1);
          }
        }
      }
    }
  });
}

/**
 * Create owner account
 */
createSuperUser = () => {
  return new Promise((_res, _rej) => {
    var user, contacts, sUsername, sEmail, sPass,
      validationHelper = require("../../core/helper/validation");

    user = model(
      "user",
      require("../../core/database/schemas/user")
    );

    contacts = model(
      "contacts",
      require("../../core/database/schemas/contacts")
    );

    while (true) {
      sUsername = question("Your login: ");

      // Checking login
      if (validationHelper.isValidLogin(sUsername)) break;

      logger.warn(
        "Username may contain only letters, digits, underscores and dots."
      );
    }

    while (true) {
      sEmail = question("Your email: ");

      // Checking email
      if (validationHelper.isEmail(sEmail)) break;

      logger.warn("Wrong email format.");
    }

    while (true) {
      let sRepass;

      sPass = question("Your password: ", {
        hideEchoBack: true
      });

      sRepass = question("Repeat your password: ", {
        hideEchoBack: true
      });

      // Checking password
      if (validationHelper.isValidPassword(sPass) && sPass === sRepass) break;

      logger.err("Passwords are not equal.");
    }

    user.find({
      where: {
        role: 3
      }
    })
    .then(oUser => {
      if (_.isEmpty(oUser) === false) {
        logger.info("Owner account is already exists.");
        return _res();
      }

      return contacts.create();
    })
    .then(oContact =>
      user.create({
        login: sUsername,
        email: sEmail,
        password: require("bcryptjs").hashSync(sPass),
        registeredAt: require("moment")().format(),
        role: 3,
        status: 1,
        contactsId: oContact.get({plain: true}).contactsId
      })
    )
    .then(() => _res())
    .catch(err => _rej(err));
  });
};

module.exports = function() {
  return new Promise((_res, _rej) => {
    var bIsForce, bCreateSuperUser;

    bIsForce = question(
      "Drop and database structure? (Y/n): "
    ) || "y";

    bIsForce = (
      bIsForce === "y" || bIsForce === "yes" ||
      bIsForce === "д" || bIsForce === "да"
    ) ? true : false;

    if (bIsForce === false) {
      bCreateSuperUser = question(
        "Create owner account? (Y/n): "
      ) || "y";
    }

    bCreateSuperUser = (
      bCreateSuperUser === "y" || bCreateSuperUser === "yes" ||
      bCreateSuperUser === "д" || bCreateSuperUser === "да"
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

module.exports.importData = importData;
