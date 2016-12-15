"use strict"

class Exception
  constructor: (name, @message, @status = 500, props) ->
    @name = "Exception"
    @props =
      props ? {
        status: @status
        message: "I just don't know what went wrong."
      }

    Error.captureStackTrace this, Exception

module.exports = Exception
