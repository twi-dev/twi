'use strict'

ponyFiction = require './core/server'
cluster = require './core/server/cluster'

ponyFiction()
  .then (server) ->
    cluster server
  .catch (err) ->
    console.log do err.toString
    console.log err.stack