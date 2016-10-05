"use strict"

{execSync} = require "child_process"
migrate = require "./migrate"

linkTwi = ->
  try
    execSync "which twi" # temporarily way
  catch err
    process.stdout.write String execSync "npm link"

clean = ->

silent = (clean = off) ->
  migrate clean
  do linkTwi

  await return

module.exports = {
  silent
}
