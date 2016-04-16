'use strict'

Promise = require 'pinkie-promise'
express = require 'express'
bodyParser = require 'body-parser'
favicon = require 'serve-favicon'

{__ROOT__, __CORE__, getConfig} = require '../components'
{version} = require '../../package.json'

i18n = require '../i18n'
logger = require '../logger'
controller = require './controller'
errorHandler = require '../errors/ErrorHandler'

# Bad way?
global.__ROOT__ = __ROOT__
global.__CORE__ = __CORE__

app = do express
oConfig = do getConfig

redirectUrl = (req, res, next) ->
  app.locals.__redirectUri = req.url
  do next

###
# Run server
###
run = ->
  {port} = oConfig.app
  app.listen port, ->
    logger.logLine i18n.t('ponyfiction.runSuccess', port: port),
      logger.LOG_OK

###
# Configure app
###
configure = ->
  app.locals.name = oConfig.app.name
  app.locals.VERSION = version

  app.set 'x-powered-by', oConfig.xPoweredBy or yes
  app.set 'view engine', 'jade'

  app.workers = oConfig.app.workers
  app.run = run

###
# Init all routes and middlewares
###
init = ->
  app.use favicon __ROOT__ + '/public/img/icns/favicons/ponyfiction-js.ico'
  app.use express.static __ROOT__ + '/public'
  app.use bodyParser.urlencoded extended: on
  app.use logger
  app.use redirectUrl
  controller app
  app.use errorHandler

ponyFiction = ->
  return new Promise (_res, _rej) ->
    try
      logger.logLine i18n.t 'ponyfiction.configure'
      do configure
      logger.logLine i18n.t 'ponyfiction.init'
      do init
    catch err
      return _rej err

    _res app

module.exports = ponyFiction
