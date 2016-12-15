"use strict"

i18n = require "../core/i18n"
{app: {name}} = require "../core/helper/configure"

###
# Response Site Help page
# 
# GET /help
###
actionHelp = (ctx) ->
  ctx.body = message: "Help center will be here"

  await return

###
# Send a feedback message
# 
# POST /feedback
###
actionSend = (ctx) -> await return

###
# Response Site Rules page
# 
# GET /rules
###
actionRules = (ctx) ->
  ctx.body = message: "Rules will be here"

  await return

# TODO: Move to frontend server
actionOutdated = ->
  await ctx.render "errors/outdated",
    title: "You are using an outdated browser"

  await return

module.exports = (r) ->
  # Site help & FAQ
  r "/help"
    .get actionHelp

  # Site feedback
  r "/feedback"
    .post actionSend

  # Site rules
  r "/rules"
    .get actionRules

  # r "/outdated"
  #   .get actionOutdated

  return
