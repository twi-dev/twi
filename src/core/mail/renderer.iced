'use strict'

{readFile, readdir, readdirSync, realpathSync} = require 'fs'
{basename, extname, dirname} = require 'path'
{render} = require 'jade'
{app: {host, name}} = require '../helpers/configure-helper'

_ = require 'lodash'
i18n = require '../i18n'

PUG_EXT = ['.jade', '.pug']
EMAIL_TEMPLATES = realpathSync "#{__dirname}/../../views/mail"

oLocals =
  name: name
  host: host
  t: i18n.t

normalizePath = (sPath, cb) ->
  await readdir (dirname sPath),
    defer err, aFiles
  return cb err if err?

  for sFilename in aFiles when (__sExtname = extname sFilename) in PUG_EXT
    __sFilename = "#{basename sFilename, __sExtname}"
    if __sFilename is basename sPath
      return cb null, "#{dirname sPath}/#{__sFilename}.jade"

  cb null, sPath

renderer = (sName, oOptions, cb) ->
  unless typeof sName is 'string'
    return cb new TypeError "Name must be a string."

  if typeof oOptions is 'function'
    [cb, oOptions] = [oOptions, {}]

  oOptions = _.assign oOptions, oLocals

  await normalizePath "#{EMAIL_TEMPLATES}/#{sName}",
    defer err, sPath
  return cb err if err?

  await readFile sPath,
    defer err, sContent
  return cb err if err?

  oOptions.filename = sPath

  try
    sContent = render sContent, oOptions
  catch err
    return cb err

  cb null, sContent

module.exports = renderer
