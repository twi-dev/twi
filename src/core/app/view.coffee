"use strict"

{compile} = require "jade"
{assign, merge} = require "lodash"
{realpathSync, readFileSync} = require "fs"
{version, codename} = require "../../package.json"
{t} = require "../i18n"

{
  app: {name, credits, theme}
  static: {host, port, secure}
  IS_DEVEL
} = require "../helper/configure"

getHostname = require "../helper/util/getHostname"

theme or= "twi"
VIEWS = realpathSync "#{__dirname}/../../themes/#{theme}/views"
{NODE_ENV} = process.env

oConfig = null

# Tiny cache for templates :D
oCache = {}

oDefaults =
  views: VIEWS
  debug: IS_DEVEL
  cache: not IS_DEVEL

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
    static: getHostname host, port, secure
    __return: @url
  }, oOptions), oLocals

init = (app, oCustom = {}) ->
  oConfig = merge oDefaults, oCustom, pretty: no
  app.context.render = renderer

module.exports = init
