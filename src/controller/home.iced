'use strict'

i18n = require '../core/i18n'

###
# Response a home page
# 
# GET /
###
actionIndex = (req, res, next) ->
  res.render 'home/home',
    title: i18n.t 'home.title.index',
      name: res.app.locals.name

###
# Response Site Help page
# 
# GET /help
###
actionHelp = (req, res) ->
  res.render 'home/help',
    title: i18n.t 'home.title.help'

###
# Response Site Feedback page
# 
# GET /feedback
###
actionFeedback = (req, res) ->
  res.render 'home/feedback',
    title: i18n.t 'home.title.feedback'

###
# Send a feedback message
# 
# POST /feedback
###
actionSend = (req, res) ->

###
# Response Site Rules page
# 
# GET /rules
###
actionRules = (req, res) ->
  res.render 'home/rules',
    title: i18n.t 'home.title.rules'

module.exports = (app) ->
  # Home page
  app.get '/', actionIndex

  # Site help & FAQ
  app.get '/help', actionHelp

  # Site feedback
  app.route '/feedback'
    .get actionFeedback
    .post actionSend

  # Site rules
  app.get '/rules', actionRules
