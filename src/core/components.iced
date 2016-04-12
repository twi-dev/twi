{readSync} = require 'node-yaml'
{dirname} = require 'path'
{merge} = require 'lodash'
logger = require './logger'

__ROOT__ = dirname __dirname
__CORE__ = __ROOT__ + '/core'
_oConfig = null

_configure = ->
  CONFIGS_ROOT = __ROOT__ + '/configs'
  __oDefaultConfig = readSync CONFIGS_ROOT + '/default.config.yaml'
  __oUserConfig = readSync CONFIGS_ROOT + '/user.config.yaml'
  return merge __oDefaultConfig, __oUserConfig

getConfig = -> _oConfig or= do _configure

module.exports =
  __ROOT__: __ROOT__
  __CORE__: __CORE__
  getConfig: getConfig
  logger: logger