PrettyError = require 'pretty-error'
HttpException = require './HttpException'
{logLine, LOG_ERR} = require '../logger'

pe = new PrettyError

module.exports = (err, req, res, next) ->
  console.log pe.render err

  if err instanceof HttpException
    res
      .status err.code
      .render 'errors/http-error',
        code: err.code
        message: err.message
    return

  res
    .status 500
    .render 'errors/http-error',
      code: 500
      message: 'I just don\'t know what went wrong.'
