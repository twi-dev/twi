Koa = require "koa"
serve = require "koa-static"
compress = require "koa-compress"

view = require "./view"

{
  actionIndex
  actionOutdated
} = require "./frontend"

{
  app: {theme}
  static: {host, port, secure}
} = require "../helper/configure"

views = require "./view"

app = new Koa
STATIC_PATH = "#{do process.cwd}/public"

view app, debug: off

app
  .use do compress
  .use serve "#{STATIC_PATH}"
  .use actionIndex
  .use actionOutdated

msg = "Static server started on"
module.exports = {
  app, host, port, secure, msg
}
