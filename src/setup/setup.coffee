"use strict"

pify = require "pify"
migrate = require "./migrate"

ora = do require "ora"
{exec} = pify require "child_process"
{read} = require "node-yaml"
{prompt} = require "inquirer"
{isPlainObject, isArray} = require "lodash"

QUESTIONS =
  app:
    name: "Your project name:"

###
# Try to run prompt with error handling
#
# @param object q
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
      {constructor: {name}} = err
      unless name is "TypeError" and err.message.endsWith "is not a promise"
        throw err

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
    res[__k] = (await tryPrompt __v)[__k]

  await return res

configure = ->
  answ = await runQuestions normalizeQuestions QUESTIONS
  await return

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
