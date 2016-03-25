Sequelize = require 'sequelize'

{getConfig} = require '../components'
{database} = do getConfig

sConnectionString = "#{database.driver}://#{database.user}" +
  "#{if database.pass? then ':' + database.pass else ''}@" +
  "#{database.host}#{if database.port? then ':' + database.port else ''}" +
  "/#{database.dbname}"

oConnection = new Sequelize 'mysql://root@localhost/sandbox'

class Model
  constructor: ->
    @_aAttributes = []
    @_model = oConnection.define do @tableName

  tableName: -> return ''

  findOne: (oOptions, cb) ->
    @_model.findOne
      attributes: @_aAttributes
      where:
        login: oOptions
    .then (oData) ->
      cb null, oData
    .catch (err) ->
      cb err

module.exports = Model