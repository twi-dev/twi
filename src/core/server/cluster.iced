'use strict'

cluster = require 'cluster'
{cpus} = require 'os'

iCpus = cpus().length

init = (server) ->
  {workers} = server
  workers or= iCpus

  unless 0 <= workers <= iCpus
    workers = iCpus

  if cluster.isMaster
    for i in [1..workers]
      do cluster.fork
  else
    do server.run

module.exports = init
