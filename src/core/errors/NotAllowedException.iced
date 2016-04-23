HttpException = require './HttpException'

class NotAllowedException extends HttpException
  constructor: (@message) ->
    @name = 'NotAllowedException'
    @code = 405
    super @message, @code, @name

module.exports = NotAllowedException
