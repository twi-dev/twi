HttpException = require "./HttpException"
{assign} = require "lodash"
{t} = require "../i18n"

message = t "errors.http.forbidden.message"

class ForbiddenException extends HttpException
  constructor: (@message, props) ->
    @name = "FrobiddenException"
    @status = 403

    super @name, @message, @status, assign {@status, message}, props

module.exports = ForbiddenException
