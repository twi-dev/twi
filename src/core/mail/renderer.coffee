'use strict'

{readdirSync, realpathSync} = require 'fs'
{readFile, readdir} = require 'promise-fs'
{basename, extname, dirname} = require 'path'
{render} = require 'jade'
{app: {host, name, theme}} = require '../helper/configure'

_ = require 'lodash'
i18n = require '../i18n'

PUG_EXT = ['.jade', '.pug']
EMAIL_TEMPLATES = realpathSync "#{__dirname}/../../themes/#{theme}/views/mail"

oLocals =
  name: name
  host: host
  t: i18n.t

normalizePath = (sPath) ->
  aFiles = await readdir dirname sPath

  for sFile in aFiles when (__sExtname = extname sFile) in PUG_EXT
    __sFilename = "#{basename sFile, __sExtname}"
    if __sFilename is basename sPath
      return "#{dirname sPath}/#{__sFilename}.jade"

  return sPath

renderer = (sName, oOptions = {}) ->
  unless typeof sName is 'string'
    throw new TypeError "Name must be a string."

  oOptions = _.assign oOptions, oLocals
  sPath = await normalizePath "#{EMAIL_TEMPLATES}/#{sName}"
  sContent = await readFile sPath

  oOptions.filename = sPath
  sContent = render sContent, oOptions

  return sContent

module.exports = renderer