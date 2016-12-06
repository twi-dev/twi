Koa = require "koa"
view = require "./view"

{frontend: {host, port, secure}} = require "../helper/configure"

app = new Koa
view app

app.use (ctx, next) -> await ctx.render "layout/root"; await do next

msg = "Frontend server started on"
module.exports = {
  app, host, port, secure, msg
}
