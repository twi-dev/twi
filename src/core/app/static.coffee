Koa = require "koa"
serve = require "koa-static"

{
  app: {theme}
  static: {host, port, secure}
} = require "../helper/configure"

app = new Koa
STATIC_PATH = "#{do process.cwd}/themes/#{theme}/public"

app
  .use serve "#{STATIC_PATH}"

msg = "Static server started on"
module.exports = {
  app, host, port, secure, msg
}
