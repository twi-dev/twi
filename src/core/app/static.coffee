Koa = require "koa"
serve = require "koa-static"
compress = require "koa-compress"

{
  app: {theme}
  static: {host, port, secure}
} = require "../helper/configure"

views = require "./view"

app = new Koa
STATIC_PATH = "#{do process.cwd}/theme/#{theme}"

app
  .use do compress
  .use serve "#{STATIC_PATH}/public"
  .use serve "#{STATIC_PATH}/uploads"

msg = "Static server started on"
module.exports = {
  app, host, port, secure, msg
}
