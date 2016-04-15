'use strict'

fs = require 'fs'
path = require 'path'
yaml = require 'node-yaml'
{isEmpty} = require 'lodash'

{parent} = module
sParentFile = parent.filename
sParentDir = path.dirname sParentFile

oExtensions =
  '.yaml': yaml.readSync
  '.yml': yaml.readSync

normalizePath = (sPath) ->
  aExtensions = Object.keys oExtensions
  sBasename = path.basename sPath
  sDirname = fs.realpathSync "#{sParentDir}#{path.sep}#{path.dirname sPath}"
  aFilename = fs.readdirSync sDirname

  for __sFilename in aFilename
    __sExtname = path.extname __sFilename
    __sBasename = path.basename __sFilename, __sExtname
    if sBasename is __sBasename and __sExtname in aExtensions
      return "#{sDirname}#{path.sep}#{__sFilename}"

  return "#{sDirname}#{path.sep}#{sBasename}"

requireFile = (sPath) ->
  __sExtname = path.extname sPath
  if __sExtname of oExtensions
    return oExtensions[__sExtname] sPath

  return require sPath

requireDir = (sPath, bRecursive = on) ->
  __ref = {}

  aFilename = fs.readdirSync sPath
  for __sFilename in aFilename
    __sPath = "#{sPath}#{path.sep}#{__sFilename}"
    unless do fs.statSync(__sPath).isDirectory
      __sExtname = path.extname __sFilename
      __sBasename = path.basename __sFilename, __sExtname
      __ref[__sBasename] = requireFile __sPath
    else
      continue unless bRecursive

      __oContent = requireDir __sPath
      unless isEmpty __oContent
        __ref[__sFilename] = __oContent

  return __ref

requireHelper = (sPath = '.', oOptions = {}) ->
  unless typeof sPath is 'string'
    throw new TypeError "Path must be a string."

  sPath = normalizePath sPath
  unless do fs.statSync(sPath).isDirectory
    return requireFile sPath

  return requireDir sPath

module.exports = requireHelper
