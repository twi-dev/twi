Koa = require "koa"
serve = require "koa-static"
compress = require "koa-compress"

{
  app: {theme}
  static: {host, port, secure}
} = require "../helper/configure"

views = require "./view"

app = new Koa
STATIC_PATH = "#{do process.cwd}/public"

app
  .use do compress
  .use serve "#{STATIC_PATH}/assets"
  .use serve "#{STATIC_PATH}/files"

msg = "Static server started on"
module.exports = {
  app, host, port, secure, msg
}
