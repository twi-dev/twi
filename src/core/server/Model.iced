'use strict'

Sequelize = require 'sequelize'
{getConfig} = require '../components'
{database} = do getConfig

oModels = {}

# Create new Sequelize instance
sequelize = new Sequelize database.dbname, database.user, database.pass,
  host: database.host
  dialect: database.driver
  port: database.port

module.exports = (sModelName) ->
  __oModel = sequelize.define sModelName
  unless sModelName of oModels
    oModels[sModelName] = __oModel

  return __oModel
