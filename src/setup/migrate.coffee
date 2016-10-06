fs = require "promise-fs"
db = require "../core/database"
shortid = require "shortid"
redis = require "then-redis"
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

  ret = {}
  await for own __k, __sch of schemas when isFunction(__sch) and
  not __k.endsWith "Locale"
    if (__data = data[__k])?
      __model = db __k, __sch

      await __model.destroy truncate: on, logging: no unless notErase
      ret[__k] = await __model.bulkCreate __data, logging: off, returning: on
    else
      continue

  for __lang, __localeData of locales
    for __k, __arr of ret when (__data = __localeData[__k])?
      __name = "#{__k}Locale"
      __model = db(__name, schemas[__name])

      await __model.destroy truncate: on, logging: no unless notErase
      for __values, __idx in __data
        await __model.create assign(
            {}, {
              "#{__k}Id": __arr[__idx].dataValues["#{__k}_id"]
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

migrate = (cmd) ->
  do ora.start
  ora.color = "magenta"

  unless cmd.S
    console.log "Silent mode is off"

  await loadSchemas cmd.E
  await importData cmd.E

  do ora.stop
  await return

module.exports = migrate
module.exports.importData = importData
