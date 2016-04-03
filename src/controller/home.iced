###
# Response a home page
# 
# GET /
###
actionIndex = (req, res) ->
  res.render 'home/home'

###
# Response Site Help page
# 
# GET /help
###
actionHelp = (req, res) ->
  res.send 'Site help',
    title: 'Справочная информация'

###
# Response Site Feedback page
# 
# GET /feedback
###
actionFeedback = (req, res) ->
  res.send 'Site feedback',
    title: 'Обратная связь'

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
  res.send 'Site rules',
    title: 'Правила'

actionPowered = (req, res) ->
  res.render 'home/powered',
    title: 'Техническая сторона ponyFiction.js'

module.exports = (app) ->
  # Home page
  app.get '/', actionIndex

  # Site help & FAQ
  app.get '/help'

  # Site feedback
  app.route '/feedback'
    .get actionFeedback
    .post actionSend

  # Site rules
  app.get '/rules', actionRules