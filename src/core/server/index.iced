'use strict'

Promise = require 'pinkie-promise'
express = require 'express'
bodyParser = require 'body-parser'
favicon = require 'serve-favicon'

{__ROOT__, __CORE__, getConfig, logger} = require '../components'
{version} = require __ROOT__ + '/package.json'

i18n = require __CORE__ + '/i18n'
controller = require __CORE__ + '/server/controller'
errorHandler = require __CORE__ + '/errors/ErrorHandler'

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
    logger.logLine "ponyFiction.js started on http://localhost:#{port}/",
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
      do configure
      do init
    catch err
      return _rej err

    _res app

module.exports = ponyFiction
