'use strict'

camelcase = require 'camelcase'
ua = require 'useragent'
{isEmpty} = require 'lodash'
{browsers} = require '../helpers/configure-helper'
__toLowerCase = String::toLowerCase

###
# Checking user agent major version
###
isOutdated = (oUserAgent) ->

###
# Render outdated page unless browser is supported
###
outdated = (next) ->
  {family, major} = oAgent = ua.parse @headers['user-agent']

  __ver = browsers[camelcase __toLowerCase.call family]
  unless __ver? and __ver <= major
    return @render 'errors/outdated'

  yield next


module.exports = outdated
