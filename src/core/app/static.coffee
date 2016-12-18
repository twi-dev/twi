Koa = require "koa"
serve = require "koa-static"
compress = require "koa-compress"
favicon = require "koa-favicon"

view = require "./view"
logger = require "../middleware/logger"

actionIndex = require "./frontend"

{
  app: {theme}
  static: {host, port, secure}
} = require "../helper/configure"

views = require "./view"

app = new Koa
PUBLIC_PATH = "#{do process.cwd}/public"

view app, debug: off

app
  .use do compress
  .use favicon "#{PUBLIC_PATH}/assets/img/icns/favicons/twi.ico"
  .use serve "#{PUBLIC_PATH}"
  .use logger
  .use actionIndex

msg = "Static server started on"
module.exports = {
  app, host, port, secure, msg
}
