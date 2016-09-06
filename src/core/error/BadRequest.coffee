"use strict"

HttpException = require "./HttpException"

{assign} = require "lodash"
{t} = require "../i18n"

message = t "errors.http.badRequest.message"

class BadRequestException extends HttpException
  constructor: (@message, props) ->
    @name = "BadRequestException"
    @status = 400

    super @name, @message, @status, assign {@status, message}, props


module.exports = BadRequestException