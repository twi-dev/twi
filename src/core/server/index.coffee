"use strict"

Koa = require "koa"
convert = require "koa-convert"
serve = require "koa-static"
favicon = require "koa-favicon"
bodyparser = require "koa-bodyparser"
sess = require "koa-generic-session"
redisStore = require "koa-redis"
csrf = require "koa-csrf"
passport = require "koa-passport"
compress = require "koa-compress"
controller = require "./controller"
view = require "./view"
oConfig = require "../helper/configure"
isXhr = require "../middleware/xhr"
errorHandler = require "../middleware/error-handler"
logger = require "../middleware/logger"

{ok, info, normal}  = require "../logger"
{readFileSync, realpathSync} = require "fs"
{app: {name, port, theme, lang}, session, IS_DEVEL} = oConfig
PUBLIC_DIR = realpathSync "#{__dirname}/../../themes/#{theme}/public"
UPLOADS_DIR = realpathSync "#{__dirname}/../../uploads"
koa = new Koa
koa.keys = [session.secret]

normal "Init Twi middlewares"
csrf koa

# Check xhr request
koa
  .use isXhr

  # Set error handler
  .use errorHandler

  # Compress static
  .use do compress

  # Serve favicon and static files
  .use favicon "#{PUBLIC_DIR}/img/icns/favicons/ponyfiction-js.ico"
  .use serve PUBLIC_DIR

  # Serve uploads
  .use serve UPLOADS_DIR

  # Logger middleware for any requests
  .use logger

  # Bodyparser
  .use do bodyparser

  # Session
  .use convert sess
    store: do redisStore
    prefix: session.prefix
    key: "#{session.prefix}#{session.sessidName}"
    cookie:
      maxAge: 1000 * 60 * 60 * 24 * 360 # One year in ms

  # Csrf tokens
  .use convert csrf.middleware

  # Passport
  .use do passport.initialize
  .use do passport.session

  # Set controllers
  .use do controller.routes
  .use do controller.allowedMethods

# Set view engine
view koa, debug: off

normal "
  Run Twi server for #{process.env.NODE_ENV or "development"} environment
"

# Run server
do ->
  CERTS = realpathSync "#{__dirname}/../../configs/cert"
  try
    # TODO: Test this code with "Let's encrypt!" certificates.
    options =
      key: readFileSync "#{CERTS}/twi.key"
      cert: readFileSync "#{CERTS}/twi.crt"
    require "http2"
      .cteateServer options, do koa.callback
      .listen port
    info "Starting with HTTP2 server."
  catch err
    koa.listen port
  ok "Twi started on http://localhost:#{port}"

process.on "SIGINT", -> process.exit 0
