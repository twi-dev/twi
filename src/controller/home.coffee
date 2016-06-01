'use strict'

i18n = require '../core/i18n'
{app: {name}} = require '../core/helpers/configure-helper'

###
# Response a home page
# 
# GET /
###
actionIndex = (next) ->
  @render 'home/home',
    title: i18n.t 'home.title.index',
      name: name

  yield next

###
# Response Site Help page
# 
# GET /help
###
actionHelp = (next) ->
  @render 'home/help',
    title: i18n.t 'home.title.help'

  yield next

###
# Response Site Feedback page
# 
# GET /feedback
###
actionFeedback = (next) ->
  @render 'home/feedback',
    title: i18n.t 'home.title.feedback'

  yield next

###
# Send a feedback message
# 
# POST /feedback
###
actionSend = (next) ->
  yield next

###
# Response Site Rules page
# 
# GET /rules
###
actionRules = (next) ->
  @render 'home/rules',
    title: i18n.t 'home.title.rules'

  yield next

actionOutdated = (next) ->
  @body = 'You\'re using an outdated browser.'
  yield next

module.exports = (route) ->
  # Home page
  route '/'
    .get actionIndex

  # Site help & FAQ
  route '/help'
    .get actionHelp

  # Site feedback
  route '/feedback'
    .get actionFeedback
    .post actionSend

  # Site rules
  route '/rules'
    .get actionRules

  route '/badbrowser'
    .get actionOutdated

  return
