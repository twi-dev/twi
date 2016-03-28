ponyFiction = require './core/init'

ponyFiction()
  .then (run) ->
    # console.log 'foo'
    do run
  .catch (err) ->
    console.log do err.toString