{readSync} = require 'node-yaml'
{merge} = require 'lodash'
{realpathSync} = require 'fs'

# Config cache
oConfig = null

setEnv = (env = 'development') ->
  if env in ['pro', 'prod', 'production'] then 'production' else 'development'

configure = ->
  CONFIGS_ROOT = realpathSync "#{__dirname}/../../configs"

  # Trying to read user-config
  try
    __oUserConfig = readSync "#{CONFIGS_ROOT}/user"
  catch err
    # Set default value if user-config is not exists
    __oUserConfig = {}

  __oDefaultConfig = readSync "#{CONFIGS_ROOT}/default"
  oConfig = merge __oDefaultConfig, __oUserConfig

  # Set read-only property IS_DEVEL
  Object.defineProperty oConfig, 'IS_DEVEL',
    value: do ->
      NODE_ENV = process.env.NODE_ENV or= setEnv oConfig.app.env
      unless NODE_ENV is 'production' then yes else no
    writable: no
    enumerable: yes
    configurable: no

  return oConfig

module.exports = oConfig or do configure
