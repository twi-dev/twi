Exception = require './Exception'

class HttpException extends Exception
  constructor: (@message, @code, @name = 'HttpException') ->
    super @message, @code, @name

module.exports = HttpException
