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
  unless sModelName?
    throw new Error "Model name cannot be empty."
  sModelName = do sModelName.toLowerCase
  unless sModelName of oModels
    oModels[sModelName] = sequelize.define sModelName

  return oModels[sModelName]
