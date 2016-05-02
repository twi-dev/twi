'use strict'

Promise = require 'pinkie-promise'
express = require 'express'
favicon = require 'serve-favicon'
methodOverride = require 'method-override'
csrf = require 'csurf'
bodyParser = require 'body-parser'
cookieParser = require 'cookie-parser'
connectRedis = require 'connect-redis'
session = require 'express-session'
passport = require 'passport'
localStrategy = 'passport-local'

{version} = require '../../package.json'
{realpathSync} = require 'fs'

i18n = require '../i18n'
logger = require '../logger'
controller = require './controller'
errorHandler = require '../errors/ErrorHandler'
oConfig = require '../helpers/configure-helper'

app = do express
RedisStore = connectRedis session
__ROOT__ = realpathSync "#{__dirname}/../../"

process.env.NODE_ENV or= do ->
  {app: {env}} = oConfig
  if env in ['pro', 'prod', 'production']
    'production'
  else
    'development'

redirectUrl = (req, res, next) ->
  app.locals.__redirectUri = req.url
  do next

###
# Configure app
###
configure = ->
  app.locals.name = oConfig.app.name
  app.locals.VERSION = version
  app.locals.t = i18n.t

  app.set 'x-powered-by', oConfig.xPoweredBy or yes
  app.set 'view engine', 'jade'

###
# Init all routes and middlewares
###
init = ->
  app.use favicon __ROOT__ + '/public/img/icns/favicons/ponyfiction-js.ico'
  app.use express.static __ROOT__ + '/public'
  app.use do cookieParser
  app.use session
    store: new RedisStore()
    name: "#{oConfig.session.prefix}#{oConfig.session.sessidName}"
    secret: oConfig.app.storeSecret # Required!
    # I have to read express-session docs before use options from below.
    resave: no
    saveUninitialized: no
  app.use bodyParser.urlencoded extended: on
  app.use csrf
    cookie:
      key: "#{oConfig.session.prefix}csrf"
  app.use do passport.initialize
  app.use do passport.session
  app.use logger
  app.use redirectUrl
  app.use (req, res, next) ->
    app.locals.user = if req.user?
      req.user.url = do req.user.username.toLowerCase
      req.user
    else null
    do next
  controller app
  app.use errorHandler

###
# Run server
###
run = ->
  logger.logLine i18n.t 'ponyfiction.configure'
  do configure

  logger.logLine i18n.t 'ponyfiction.init'
  do init

  {port} = oConfig.app
  app.listen port, ->
    logger.logLine i18n.t('ponyfiction.runSuccess', port: port),
      logger.LOG_OK

ponyFiction = -> new Promise (_res, _rej) -> _res run

module.exports = ponyFiction
