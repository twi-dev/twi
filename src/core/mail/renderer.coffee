'use strict'

{readdirSync, realpathSync} = require 'fs'
{readFile, readdir} = require 'co-fs'
{basename, extname, dirname} = require 'path'
{render} = require 'jade'
{app: {host, name, theme}} = require '../helpers/configure-helper'

_ = require 'lodash'
thunk = require 'thunkify'
i18n = require '../i18n'

PUG_EXT = ['.jade', '.pug']
EMAIL_TEMPLATES = realpathSync "#{__dirname}/../../themes/#{theme}/views/mail"

oLocals =
  name: name
  host: host
  t: i18n.t

normalizePath = (sPath) ->
  aFiles = yield readdir dirname sPath

  for sFilename in aFiles when (__sExtname = extname sFilename) in PUG_EXT
    __sFilename = "#{basename sFilename, __sExtname}"
    if __sFilename is basename sPath
      yield "#{dirname sPath}/#{__sFilename}.jade"
      return

  yield sPath

renderer = (sName, oOptions = {}) ->
  unless typeof sName is 'string'
    throw new TypeError "Name must be a string."

  oOptions = _.assign oOptions, oLocals
  sPath = yield normalizePath "#{EMAIL_TEMPLATES}/#{sName}"
  sContent = yield readFile sPath

  oOptions.filename = sPath
  sContent = render sContent, oOptions

  yield sContent

module.exports = renderer
