{__ROOT__, getConfig, logger} = require './components'
{version} = require __ROOT__  + '/package.json'
Promise = require 'pinkie-promise'
express = require 'express'
controller = require './server/controller'
# ErrorHandler = require './errors/ErrorHandler'

app = do express
app.__ROOT__ = __ROOT__
app.VERSION = version

###
# Configure application before start
#
# @param object oConfig - Application config
###
configure = (oConfig) ->
  app.locals.name = oConfig.app.name
  app.locals.public = __ROOT__ + '/public'
  app.set 'x-powered-by', oConfig.app.xPoweredBy
  # Note: Jade will rename to pug. Do not forget to replace.
  app.set 'view engine', 'jade'
  app.use express.static __ROOT__ + '/public'
  app.use logger
  # app.use ErrorHandler

module.exports = ->
  return new Promise (_res, rej) ->
    oConfig = do getConfig
    configure oConfig
    controller app
    _res ->
      app.listen oConfig.app.port, ->
      logger.logLine "Application started on http://localhost:#{oConfig.app.port}", logger.LOG_OK