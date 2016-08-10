'use strict'

requireHelper = require '../helpers/require-helper'

{realpathSync} = require 'fs'
{isFunction} = require 'lodash'
{warn} = require '../logger'

NotFoundException = require '../errors/NotFound'
NotAllwedException = require '../errors/NotAllowed'

CONTROLLERS = realpathSync "#{__dirname}/../../controller"
# router = require 'koa-routing'

Router = require 'koa-router'
router = new Router

wrapRouter = (path) ->
  return methods =
    get: (actions...) ->
      router.get.apply router, [path, actions...]
      return methods
    post: (actions...) ->
      router.post.apply router, [path, actions...]
      return methods
    patch: (actions...) ->
      router.patch.apply router, [path, actions...]
      return methods
    put: (actions...) ->
      router.put.apply router, [path, actions...]
      return methods
    delete: (actions...) ->
      router.delete.apply router, [path, actions...]
      return methods
    all: (actions...) ->
      router.all.apply router, [path, actions...]
      return methods

###
# Throwing NotFoundException for unknown routes on GET method
###
actionNotFound = (ctx) ->
  throw new NotFoundException "Page not found on route #{ctx.url}"
  await return

###
# Throwing NotAllwedException for unknown methods on any routes
###
actionNotAllowed = (ctx) ->
  throw new NotAllwedException "
    Unknown method #{ctx.method} on route #{ctx.url}
  "
  await return

controller = (app) ->
  # Set router middleware
  # app.use router app

  # # Require all controllers
  controllers = requireHelper CONTROLLERS

  for __name, __controller of controllers
    unless isFunction __controller
      warn "Controller \"#{__name}\" is not a function."
      continue

    # Init routes
    __controller wrapRouter

  # Error pages
  wrapRouter '*'
    .get actionNotFound
    .all actionNotAllowed

  # return router

  app
    .use do router.routes
    .use do router.allowedMethods

  return

module.exports = controller
