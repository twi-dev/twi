'use strict'

HttpException = require './HttpException'
{warn, err} = logger = require '../logger'

handle = (error) ->
  {status, stack} = error
  logger.err stack
  unless error instanceof HttpException
    @status = 500
    @render "errors/500"
    return

  @status = status or 500
  @render "errors/#{status}" or "500",
    code: status

errorHandler = (next) ->
  try
    yield next
  catch err
    handle.call this, err

  return

module.exports = errorHandler
