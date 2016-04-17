{readSync} = require 'node-yaml'
{merge} = require 'lodash'
{realpathSync} = require 'fs'

oConfig = null

configure = ->
  CONFIGS_ROOT = realpathSync "#{__dirname}/../../configs"
  __oDefaultConfig = readSync "#{CONFIGS_ROOT}/default.config.yaml"
  __oUserConfig = readSync "#{CONFIGS_ROOT}/user.config.yaml"
  return merge __oDefaultConfig, __oUserConfig

module.exports = oConfig or= do configure
