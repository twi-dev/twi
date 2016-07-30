'use strict'

i18n = require '../core/i18n'
{app: {name}} = require '../core/helpers/configure-helper'

###
# Response a home page
# 
# GET /
###
actionIndex = ->
  @render 'home/home',
    title: i18n.t 'home.title.index',
      name: name

  yield return

###
# Response Site Help page
# 
# GET /help
###
actionHelp = ->
  @render 'home/help',
    title: i18n.t 'home.title.help'

  yield return

###
# Response Site Feedback page
# 
# GET /feedback
###
actionFeedback = ->
  @render 'home/feedback',
    title: i18n.t 'home.title.feedback'

  yield return

###
# Send a feedback message
# 
# POST /feedback
###
actionSend = -> yield return

###
# Response Site Rules page
# 
# GET /rules
###
actionRules = ->
  @render 'home/rules',
    title: i18n.t 'home.title.rules'

  yield return

actionOutdated = ->
  @render 'errors/outdated',
    title: 'You are using an outdated browser'

  yield return

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
