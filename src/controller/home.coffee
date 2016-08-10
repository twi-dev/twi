'use strict'

i18n = require '../core/i18n'
{app: {name}} = require '../core/helpers/configure-helper'

###
# Response a home page
# 
# GET /
###
actionIndex = (ctx) ->
  ctx.render 'home/home',
    title: i18n.t 'home.title.index',
      name: name

  await return

###
# Response Site Help page
# 
# GET /help
###
actionHelp = (ctx) ->
  ctx.render 'home/help',
    title: i18n.t 'home.title.help'

  await return

###
# Response Site Feedback page
# 
# GET /feedback
###
actionFeedback = (ctx) ->
  ctx.render 'home/feedback',
    title: i18n.t 'home.title.feedback'

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
  ctx.render 'home/rules',
    title: i18n.t 'home.title.rules'

  await return

actionOutdated = ->
  ctx.render 'errors/outdated',
    title: 'You are using an outdated browser'

  await return

module.exports = (r) ->
  # Home page
  r '/'
    .get actionIndex

  # Site help & FAQ
  r '/help'
    .get actionHelp

  # Site feedback
  r '/feedback'
    .get actionFeedback
    .post actionSend

  # Site rules
  r '/rules'
    .get actionRules

  r '/outdated'
    .get actionOutdated

  return
