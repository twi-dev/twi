'use strict'

Koa = require 'koa'
convert = require 'koa-convert'
serve = require 'koa-static'
favicon = require 'koa-favicon'
bodyparser = require 'koa-bodyparser'
sess = require 'koa-generic-session'
redisStore = require 'koa-redis'
csrf = require 'koa-csrf'
passport = require 'koa-passport'
compress = require 'koa-compress'
controller = require './controller'
view = require './view'
oConfig = require '../helper/configure'
isXhr = require '../middleware/xhr'
errorHandler = require '../middleware/error-handler'
logger = require '../middleware/logger'

{ok, info, normal}  = require '../logger'
{readFileSync, realpathSync} = require 'fs'
{app: {name, port, theme, lang}, session, IS_DEVEL} = oConfig
PUBLIC_DIR = realpathSync "#{__dirname}/../../themes/#{theme}/public"
UPLOADS_DIR = realpathSync "#{__dirname}/../../uploads"
app = new Koa
app.keys = [session.secret]

normal 'Init Twi middlewares'

# Check xhr request
app.use isXhr

# Set error handler
app.use errorHandler

# Compress static
app.use do compress

# Serve favicon and static files
app.use favicon "#{PUBLIC_DIR}/img/icns/favicons/ponyfiction-js.ico"
app.use serve PUBLIC_DIR

# Serve uploads
app.use serve UPLOADS_DIR

# Logger middleware for any requests
app.use logger

# Bodyparser
app.use do bodyparser

# Session
app.use convert sess
  store: do redisStore
  prefix: session.prefix
  key: "#{session.prefix}#{session.sessidName}"
  cookie:
    maxAge: 1000 * 60 * 60 * 24 * 360 # One year in ms

# Csrf tokens
csrf app
app.use convert csrf.middleware

# Passport
app
  .use do passport.initialize
  .use do passport.session

# Set controllers
controller app

# Set view engine
view app, debug: off

normal "
  Run Twi server for #{process.env.NODE_ENV or 'development'} environment
"

# Run server
do ->
  CERTS = realpathSync "#{__dirname}/../../configs/cert"
  try
    # TODO: Test this code with "Let's encrypt!" certificates.
    oOptions =
      key: readFileSync "#{CERTS}/twi.key"
      cert: readFileSync "#{CERTS}/twi.crt"
    require 'http2'
      .cteateServer oOptions, do app.callback
      .listen port
    info "Starting with HTTP2 server."
  catch err
    app.listen port
  ok "Twi started on http://localhost:#{port}"
