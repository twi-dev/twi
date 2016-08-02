'use strict'

requireHelper = require '../helpers/require-helper'

{realpathSync} = require 'fs'
{isFunction} = require 'lodash'
{warn} = require '../logger'

NotFoundException = require '../errors/NotFound'
NotAllwedException = require '../errors/NotAllowed'

CONTROLLERS = realpathSync "#{__dirname}/../../controller"
router = require 'koa-routing'

###
# Throwing NotFoundException for unknown routes on GET method
###
actionNotFound = ->
  throw new NotFoundException "Page not found on route #{@url}"
  yield return

###
# Throwing NotAllwedException for unknown methods on any routes
###
actionNotAllowed = ->
  throw new NotAllwedException "
    Unknown method #{@method} on route #{@url}
  "
  yield return

controller = (app) ->
  # Set router middleware
  app.use router app

  # Require all controllers
  controllers = requireHelper CONTROLLERS

  for __name, __controller of controllers
    unless isFunction __controller
      warn "Controller \"#{__name}\" is not a function."
      continue

    # Init routes
    __controller app.route

  # Error pages
  app.route '*'
    .get actionNotFound
    .all actionNotAllowed

  return router

module.exports = controller
