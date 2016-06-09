'use strict'

list = require 'browserslist'
ua = require 'useragent'
{isEmpty} = require 'lodash'
{browsers} = require '../helpers/configure-helper'
aSupported = list browsers

###
# Checking user agent major version
###
isOutdated = (oUserAgent) ->

###
# Render outdated page unless browser is supported
###
outdated = (next) ->
  {family, major} = oAgent = ua.parse @headers['user-agent']

  # console.log oAgent
  # console.log aSupported

  # unless
  unless "#{do family.toLowerCase} #{major}" in aSupported
    # @render 'errors/outdated'
    @body = 'You are using an outdated browser'
    return

  yield next


module.exports = outdated
