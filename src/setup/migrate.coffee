fs = require "promise-fs"
db = require "../core/database"
redis = require "then-redis"
shortid = require "shortid"
requireHelper = require "../core/helper/require"

ora = do require "ora"
{realpathSync} = require "fs"
{isFunction, assign} = require "lodash"

TWI_ROOT = realpathSync "#{__dirname}/../"
schemas = requireHelper "#{TWI_ROOT}/core/database/schemas"
data = requireHelper "#{TWI_ROOT}/migrations/data"
locales = requireHelper "#{TWI_ROOT}/migrations/locales", yes

###
# Load all schemas to database
#
# @params boolean notErase
###
loadSchemas = (notErase = off) ->
  ora.text = "Loading schemas..."

  for own __k, __sch of schemas when isFunction __sch
    await db(__k, __sch).sync force: not notErase, logging: off

  await return

###
# Import migrations data to database
#
# @param boolean notErase
###
importData = (notErase = off) ->
  ora.text = "Importing data..."

  # Creating models
  models = {}
  for own __k, __sch of schemas when isFunction __sch
    __model = db __k, __sch
    models[__k] = __model
    await __model.destroy truncate: on, logging: no unless notErase

  # Importing data
  ret = {}
  for own __k, __model of models when not __k.endsWith("Locale") and
  (__data = data[__k])?
    ret[__k] = []
    for __values, __idx in __data
      [ret[__k][__idx]] = await __model.findOrCreate
        where: __values
        defaults: __values
        logging: no

  # Importing locales
  ora.text = "Importing data locales..."
  for __lang, __localeData of locales
    for __k, __arr of ret when (__data = __localeData[__k])?
      __model = models["#{__k}Locale"]
      for __values, __idx in __data
        __id = __arr[__idx].dataValues["#{__k}Id"]
        await __model.findOrCreate
          where: "#{__k}Id": __id, lang: __lang
          defaults: assign(
            {}, {
              "#{__k}Id": __id
              lang: __lang
            }, __values
          ), logging: no

  await return

###
# Create super user account
#
# @param boolean silent
###
createSu = (silent = off) ->
  await return

###
# Migrations command implementation
#
# @param Command cmd
###
migrate = (cmd) ->
  do ora.start
  ora.color = "magenta"

  await loadSchemas cmd.E
  await importData cmd.E

  do ora.stop
  await return

module.exports = migrate
module.exports.importData = importData
module.exports.createSu = createSu
