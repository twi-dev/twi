{readSync} = require 'node-yaml'
{merge} = require 'lodash'
{realpathSync} = require 'fs'

# Config cache
config = null

setEnv = (env = 'development') ->
  if env in ['pro', 'prod', 'production'] then 'production' else 'development'

configure = ->
  CONFIGS_ROOT = realpathSync "#{__dirname}/../../configs"

  # Trying to read user-config
  try
    __userConfig = readSync "#{CONFIGS_ROOT}/user"
  catch err
    # Set default value if user-config is not exists
    __userConfig = {}

  __defaultConfig = readSync "#{CONFIGS_ROOT}/default"
  config = merge __defaultConfig, __userConfig

  # Set read-only property IS_DEVEL
  Object.defineProperty config, 'IS_DEVEL',
    value: do ->
      NODE_ENV = process.env.NODE_ENV or= setEnv config.app.env
      unless NODE_ENV is 'production' then yes else no
    writable: no
    enumerable: yes
    configurable: no

  return config

module.exports = config or do configure
