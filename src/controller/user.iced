user = new User = require '../model/User'

###
# Respons login page
# 
# GET /login
###
actionLogin = (req, res) ->
  res.send 'Login page will be here'

###
# POST /login
###
actionSignin = (req, res) ->

###
# Response login page for GET method
# 
# GET /signup
###
actionRegister = (req, res) ->
  res.send 'Registeration page'

###
# Register new user
# 
# POST /signup
###
actionSignup = (req, res) ->

###
# List of all registered users
# 
# GET /users/:page?
###
actionUsers = (req, res) ->
  res.send 'Show all registred users'

###
# Response user profile
# 
# GET /user/:login?
###
actionProfile = (req, res) ->
  res.send req.params.login or 'Response owner account by default'

module.exports = (app) ->
  # Login
  app.route '/login'
    .get actionLogin
    .post actionSignin

  # Signup
  app.route '/signup'
    .get actionRegister
    .post actionSignup

  app.get '/users/page/:page?', actionUsers

  app.get '/user/:login?', actionProfile
