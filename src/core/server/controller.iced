'use strict'

requireDir = require 'require-dir'
{isFunction} = require 'lodash'
{logger} = require '../components'

module.exports = (app) ->
  # Require all controllers
  oControllers = requireDir app.__ROOT__ + '/controller'
  for __sName, __controller of oControllers
    unless isFunction __controller
      logger.logLine "Notice: Controller \"#{__sName}\" is not a function.", logger.LOG_INFO
      continue

    __controller app

  # Render 404
  app.route '*'
    .get (req, res) ->
      logger.logLine """
        Responsed error
          at route #{req.url}
          on method #{req.method}
          with status 404
         
      """, logger.LOG_WARN
      res
        .status 404
        .render '404'
  return