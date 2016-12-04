"use strict"

Koa = require "koa"
convert = require "koa-convert"
serve = require "koa-static"
favicon = require "koa-favicon"
bodyparser = require "koa-bodyparser"
sess = require "koa-generic-session"
redisStore = require "koa-redis"
passport = require "koa-passport"
compress = require "koa-compress"
controller = require "./controller"
view = require "./view"
config = require "../helper/configure"
isXhr = require "../middleware/xhr"
multipart = require "../middleware/multipart"
errorHandler = require "../middleware/error-handler"
logger = require "../middleware/logger"

{default: CSRF} = require "koa-csrf"
{ok, info, normal}  = require "../logger"
{readFileSync, realpathSync} = require "fs"
{readFile, realpath} = require "promise-fs"
{app: {name, port, theme, lang}, session, IS_DEVEL} = config
PUBLIC_DIR = realpathSync "#{__dirname}/../../themes/#{theme}/public"
UPLOADS_DIR = realpathSync "#{__dirname}/../../uploads"
koa = new Koa
koa.keys = [session.secret]

normal "Init Twi middlewares"

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
  .use multipart

  # Session
  .use convert sess
    store: do redisStore
    prefix: session.prefix
    key: "#{session.prefix}#{session.sessidName}"
    cookie:
      maxAge: 1000 * 60 * 60 * 24 * 360 # One year in ms

  # Csrf tokens
  .use new CSRF

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

###
# Get application server (http or http2)
###
getServer = ->
  try
    CERTS = await realpath "#{do process.cwd}/configs/cert"

    key = await readFile "#{CERTS}/twi.key"
    cert = await readFile "#{CERTS}/twi.crt"
    options = {key, cert}

    createServer = require "http2"
      .createServer.bind null, options
  catch err
    throw err unless err.code is "ENOENT"

    {createServer} = require "http"

  return createServer do koa.callback

###
# Run application server
###
runServer = -> new Promise (resolve, reject) ->
  onFulfilled = -> ok "Twi started on http://localhost:#{port}"; do resolve

  onRejected = (err) -> reject err

  try
    server = await do getServer
  catch err
    return onRejected err

  server
    .on "error", onRejected
    .listen port, onFulfilled

  return

module.exports = runServer
