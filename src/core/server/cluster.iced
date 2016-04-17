'use strict'

cluster = require 'cluster'
{cpus} = require 'os'
{app: {workers}} = require '../helpers/configure-helper'

iCpus = cpus().length

init = (server) ->
  workers or= iCpus

  unless 0 <= workers <= iCpus
    workers = iCpus

  if cluster.isMaster
    for i in [1..workers]
      do cluster.fork
  else
    do server

module.exports = init
