# Based on:
#   https://github.com/dayAlone/koa-webpack-hot-middleware/blob/master/index.js
{assign} = Object

Koa = require "koa"
serve = require "koa-static"
cors = require "kcors"

webpackDevMiddleware = require "webpack-dev-middleware"
webpackHotMiddleware = require "webpack-hot-middleware"

views = require "../../../core/app/view"
logger = require "../../../core/middleware/logger"

actionIndex = require "../../../core/app/frontend"

koa = new Koa

###
# Wrap given middleware
#
# @param function act - an express webpack middleware
# @param http.IncomingMessage req
# @param http.Response res
#
# @return Promise
###
wrapMiddleware = (act, req, res) ->
  {end} = res

  return new Promise (resolve) ->
    res.end = -> end.apply this, arguments; resolve no

    act req, res, -> resolve yes

devMiddleware = (compiler, config) ->
  act = webpackDevMiddleware compiler, config
  return (ctx, next) ->
    middleware = await wrapMiddleware act, ctx.req,
      end: (content) -> ctx.body = content
      setHeader: -> ctx.set.apply ctx, arguments

    await do next if middleware and next

hotMiddleware = (compiler, config) ->
  act = webpackHotMiddleware compiler, config
  return (ctx, next) ->
    middleware = await wrapMiddleware act, ctx.req, ctx.res
    await do next if middleware and next

# Note: DO NOT USE THIS SERVER IN PRODUCTION! THIS ONE ONLY FOR DEVELOPMENT!
devServer = (compiler, config = {}) ->
  views koa, debug: off # add view renderer to koa

  koa
    .use do cors
    .use devMiddleware compiler,
      assign {}, config.devMiddleware, config.contentBase
    .use hotMiddleware compiler, config.hotMiddleware
    .use logger
    .use serve config.contentBase
    .use actionIndex

  return koa

module.exports = devServer
