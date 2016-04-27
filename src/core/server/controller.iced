'use strict'

{isFunction} = require 'lodash'
logger = require '../logger'
i18n = require '../i18n'
requireHelper = require '../helpers/require-helper'

NotFoundException = require '../errors/NotFoundException'
NotAllowedException = require '../errors/NotAllowedException'

actionNotFound = (req, res, next) ->
  next new NotFoundException "Page not found on route #{req.url}"

actionMethodNotAllowed  = (req, res, next) ->
  next new NotAllowedException "
    Unknown method #{req.method} on route #{req.url}
  "

module.exports = (app) ->
  # Require all controllers
  oControllers = requireHelper '../../controller'

  for __sName, __controller of oControllers
    unless isFunction __controller
      logger.warn "Notice: Controller \"#{__sName}\" is not a function."
      continue

    # Set routes
    __controller app

  # For unknown methods and routes.
  app.route '*'
    .get actionNotFound
    .all actionMethodNotAllowed

  return
