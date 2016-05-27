class Exception
  constructor: (@message, @code, @name) ->
    Error.captureStackTrace @, Exception

module.exports = Exception
