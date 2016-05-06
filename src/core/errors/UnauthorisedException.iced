HttpException = require './HttpException'

class UnauthorisedException extends HttpException
  constructor: (@message) ->
    @name = 'UnauthorisedException'
    @code = 401
    super @message, @code, @name

module.exports = UnauthorisedException
