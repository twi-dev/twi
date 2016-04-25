'use strict'

cluster = require 'cluster'
{cpus} = require 'os'
{app: {workers}} = require '../helpers/configure-helper'

{length} = do cpus

init = (server) ->
  workers or= length

  unless 0 <= workers <= length
    workers = length

  if cluster.isMaster
    for i in [1..workers]
      do cluster.fork
  else
    do server

module.exports = init
