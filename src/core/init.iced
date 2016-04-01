Promise = require 'pinkie-promise'
express = require 'express'
bodyParser = require 'body-parser'
{__ROOT__, getConfig, logger} = require './components'
{version} = require __ROOT__  + '/package.json'
controller = require './server/controller'
errorHandler = require './errors/ErrorHandler'

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
  app.use bodyParser.urlencoded extended: on
  app.use logger
  app.use (req, res, next) ->
    app.locals.__redirectUri = req.url
    do next

module.exports = ->
  return new Promise (_res, rej) ->
    oConfig = do getConfig
    configure oConfig
    controller app
    app.use errorHandler
    _res ->
      app.listen oConfig.app.port, ->
        logger.logLine "Application started on
          http://localhost:#{oConfig.app.port}",
          logger.LOG_OK
