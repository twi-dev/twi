PrettyError = require 'pretty-error'
HttpException = require './HttpException'
logger = require '../logger'

{env: {NODE_ENV}} = process

pe = new PrettyError

logHttpError = (err) ->
  if err.code >= 500
    logger.err err.code
    logger.err err.message
    logger.err err.stack if NODE_ENV is 'development'
    return

  logger.warn "#{err.message}"

module.exports = (err, req, res, next) ->

  if err instanceof HttpException
    logHttpError err
    res
      .status err.code
      .render "errors/#{err.code}",
        code: err.code
    return

  console.log pe.render err
  res
    .status 500
    .render 'errors/500',
      code: 500
      message: 'I just don\'t know what went wrong.'
