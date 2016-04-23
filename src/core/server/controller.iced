'use strict'

requireDir = require 'require-dir'
{isFunction} = require 'lodash'
logger = require '../logger'
i18n = require '../i18n'

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
  oControllers = requireDir '../../controller'

  for __sName, __controller of oControllers
    unless isFunction __controller
      logger.logLine "Notice: Controller \"#{__sName}\" is not a function.",
        logger.LOG_INFO
      continue

    # Set routes
    __controller app

  # Render 404
  app.route '*'
    .get actionNotFound
    .all actionMethodNotAllowed

  return
