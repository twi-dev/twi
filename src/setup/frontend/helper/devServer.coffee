# Based on:
#   https://github.com/dayAlone/koa-webpack-hot-middleware/blob/master/index.js
Koa = require "koa"
koa = new Koa

webpackDevMiddleware = require "webpack-dev-middleware"
webpackHotMiddleware = require "webpack-hot-middleware"

wrapMiddleware = (act, req, res) ->
  {end} = res

  return new Promise (resolve) ->
    res.end = (args...) -> end.apply this, args; resolve no

    act req, res, -> resolve yes

devMiddleware = (compiler, config) ->
  act = webpackDevMiddleware compiler, config
  return (ctx, next) ->
    middleware = await wrapMiddleware act, ctx.req, ctx.res
    await do next if middleware and next

hotMiddleware = (compiler, config) ->
  act = webpackHotMiddleware compiler, config
  return (ctx, next) ->
    middleware = await wrapMiddleware act, ctx.req, ctx.res
    await do next if middleware and next

server = (compiler, config = {}) ->
  koa
    .use devMiddleware compiler, config.devMiddleware
    .use hotMiddleware compiler, config.hotMiddleware

  return koa

module.exports = server
