'use strict'

# Jade = require 'koa-jade'
{compile} = require 'jade'
{assign, merge} = require 'lodash'

# {readFile} = require 'co-fs'
{realpathSync, readFileSync} = require 'fs'
{app: {name, credits, theme}} = require '../helpers/configure-helper'
{version, codename} = require '../../package.json'
{t} = require '../i18n'

theme or= 'twi'
VIEWS = realpathSync "#{__dirname}/../../themes/#{theme}/views"
{NODE_ENV} = process.env
bIsDevel = unless NODE_ENV is 'production' then yes else no

oConfig = null

# Tiny-tiny cache for templates :D
oCache = {}

oDefaults =
  views: VIEWS
  debug: bIsDevel
  cache: not bIsDevel

oLocals =
  name: name
  version: version
  codename: codename
  theme: theme
  t: t

compiler = (sFilename) ->
  sContent = readFileSync sFilename
  compile sContent, assign oConfig, filename: sFilename

renderer = (sFilename, oOptions) ->
  fn = unless sFilename of oCache
    __ref = compiler "#{oDefaults.views}/#{sFilename}.jade"
    if oConfig.cache
      oCache[sFilename] = __ref
    else
      __ref
  else
    oCache[sFilename]

  @body = fn assign merge({
    user: @req.user
    __return: @redirectUrl ? '/'
  }, oOptions), oLocals

init = (app, oCustom = {}) ->
  oConfig = merge oDefaults, oCustom, pretty: no
  app.context.render = renderer

module.exports = init
