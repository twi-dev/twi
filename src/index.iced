'use strict'

ponyFiction = require './core/init'

ponyFiction()
  .then (run) ->
    do run
  .catch (err) ->
    console.log do err.toString