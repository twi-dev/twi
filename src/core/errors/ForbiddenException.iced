HttpException = require './HttpException'

class ForbiddenException extends HttpException
  constructor: (@message) ->
    @name = 'ForbiddenException'
    @code = 403
    super @message, @code, @name

module.exports = ForbiddenException
