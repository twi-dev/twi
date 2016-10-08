"use strict"

pify = require "pify"
migrate = require "./migrate"
prompt = require "./helper/prompt"

ora = do require "ora"
{exec} = pify require "child_process"
{write} = require "node-yaml"

QUESTIONS =
  app:
    name: "Your project name:"
    host: "Host (like https://example.com):"
    port: [
      message: "Port:"
      validate: (port) -> new Promise (resolve, reject) ->
        unless /^[0-9]+$/.test port
          return reject "Port value should be an integer."

        resolve yes
    ]
    enableSignup: [
      type: "confirm"
      message: "Do you want to enable signup service?"
    ]
  database:
    driver: [
      type: "list"
      message: "Chosse database driver:"
      choices: [
        "mysql"
        "pg"
      ]
    ]
    host: "Database server host:"
    port: [
      message: "Database server port:"
      validate: (port) -> new Promise (resolve, reject) ->
        unless /^[0-9]+$/.test port
          return reject "Port value should be an integer."

        resolve yes
    ]
    user: "Database connection username:"
    pass: "Database connection password:"
    name: "Database name:"

###
# Generate user config
###
configure = ->
  userConfig = await prompt QUESTIONS
  await write "../configs/user.yaml", userConfig

###
# Create Twi symbolic link if not exists
# Important note: I think it's compatible only with *nix
###
linkTwi = ->
  try
    await exec "which twi" # temporarily way
  catch err
    process.stdout.write String await exec "npm link"

###
# Setup command implementation
#
# @param Command cmd
###
setup = (cmd) ->
  unless cmd.S
    await do configure

  await migrate cmd
  await do linkTwi

module.exports = setup
