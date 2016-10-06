"use strict"

pify = require "pify"
migrate = require "./migrate"

{exec} = pify require "child_process"
ora = do require "ora"

linkTwi = ->
  try
    await exec "which twi" # temporarily way
  catch err
    process.stdout.write String await exec "npm link"

setup = (cmd) ->
  unless cmd.S
    console.log "Silent mode is off"

  await migrate cmd
  await do linkTwi

module.exports = setup
