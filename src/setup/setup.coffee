"use strict"

pify = require "pify"
migrate = require "./migrate"

ora = do require "ora"
{red} = require "chalk"
{exec} = pify require "child_process"
{read, write} = require "node-yaml"
{cross} = require "figures"
{prompt} = require "inquirer"
{isPlainObject, isArray} = require "lodash"
{log} = console

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

rescueTypes = (value) ->
  if value in ["null", null]
    return value = null
  else if value in ["false", no]
    return value = no
  else if value in ["true", yes]
    return value = on
  else if "#{Number value}" isnt "NaN" and value isnt ""
    return value = Number value
  else
    return value

###
# Run prompt with error handling for each questions
#
# @param object|array q
#
# @return object
#
# @thorws Error
###
tryPrompt = (q) ->
  loop
    try
      return await prompt if isArray q then q else [q]
    catch err
      if typeof err is "string" then log "#{red cross} #{err}" else throw err

###
# Normalize given questions obj due to Inquirer question format
#  see: https://github.com/SBoudrias/Inquirer.js#question
#
# @param object obj
#
# @return object
###
normalizeQuestions = (obj) ->
  res = {}
  for __k, __v of obj
    if isPlainObject __v
      res[__k] = normalizeQuestions __v
      continue

    if isArray __v
      res[__k] = __v
      continue

    res[__k] = [
      type: "input"
      message: "#{__v}"
    ]

  return res

###
# Run promps with given questions obj
#
# @param object obj
###
runQuestions = (obj) ->
  res = {}
  for __k, __v of obj
    if isPlainObject __v
      res[__k] = await runQuestions __v
      continue

    __v[0].name = __k
    res[__k] = rescueTypes (await tryPrompt __v)[__k]

  await return res

###
# Generate user config
###
configure = ->
  userConfig = await runQuestions normalizeQuestions QUESTIONS
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

setup = (cmd) ->
  unless cmd.S
    await do configure

  await migrate cmd
  await do linkTwi

module.exports = setup
