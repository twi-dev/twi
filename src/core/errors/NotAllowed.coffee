'use strict'

HttpException = require './HttpException'
{assign} = require 'lodash'
{t} = require '../i18n'

message = t 'errors.http.notAllowed.message'

class NotAllowedException extends HttpException
  constructor: (@message, props) ->
    @name = 'NotAllowedException'
    @status = 405

    super @name, @message, @status, assign {@status, message}, props

module.exports = NotAllowedException
