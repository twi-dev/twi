HttpException = require './HttpException'

class NotFoundException extends HttpException
  constructor: (@message = 'This is not the web page your are looking for.') ->
    @name = 'NotFoundException'
    @code = 404
    super @message, @code, @name

module.exports = NotFoundException
