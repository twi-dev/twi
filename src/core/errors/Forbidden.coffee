HttpException = require './HttpException'

class ForbiddenException extends HttpException
  constructor: (@message, @props) ->
    @name = 'FrobiddenException'
    @status = 403

    super @name, @message, @status, @props


module.exports = ForbiddenException
