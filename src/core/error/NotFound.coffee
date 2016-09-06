"use strict"

HttpException = require "./HttpException"

{assign} = require "lodash"
{t} = require "../i18n"

message = t "errors.http.notFound.message"

###
# Not Found Exception
###
class NotFoundException extends HttpException
  constructor: (@message, props) ->
    @name = "NotFoundException"
    @status = 404

    super @name, @message, @status, assign {@status, message}, props


module.exports = NotFoundException
