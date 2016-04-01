HttpException = require './HttpException'

class InternalException extends HttpException
  constructor: (@message) ->
    @name = 'InternalException'
    @code = 500
    super @message, @code, @name

module.exports = InternalException
