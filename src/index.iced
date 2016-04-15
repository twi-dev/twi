'use strict'

ponyFiction = require './core/server'

ponyFiction()
  .then (server) ->
    do server.run
  .catch (err) ->
    console.log do err.toString
    console.log err.stack