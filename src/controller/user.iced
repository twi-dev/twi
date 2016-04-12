'use strict'

user = new User = require '../model/User'
moment = require 'moment'

###
# Respons login page
# 
# GET /login
###
actionLogin = (req, res) ->
  res.render 'user/login',
    title: 'Авторизация'
    __redirectUri: req.query.return or '/'

###
# POST /login
###
actionSignin = (req, res, next) ->
  {email, pass} = req.body
  # await user.auth email, pass, defer err

  # return next err if err

  # __redirectUri = req.query.return
  # if __redirectUri?
  #   res
  #     .status 200
  #     .redirect __redirectUri

###
# Response login page for GET method
# 
# GET /signup
###
actionRegister = (req, res) ->
  res.render 'user/signup',
    title: 'Регистрация'
    __redirectUri: req.query.return or '/'

###
# Register new user
# 
# POST /signup
###
actionSignup = (req, res, next) ->
  # {username, email, pass} = req.body

  # await user.register username, email, pass,
  #   defer err

  # return next err if err?

  # res.status 200

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
actionProfile = (req, res, next) ->
  {login} = req.params
  await user.getByLogin login, defer err, oUserData

  return next err if err

  res.render 'user/profile',
    title: "Профиль #{oUserData.login or '%owner%'}"

module.exports = (app) ->
  # Login
  app.route '/login'
    .get actionLogin
    .post actionSignin

  # Signup
  app.route '/signup'
    .get actionRegister
    .post actionSignup

  app.get '/users/:page?', actionUsers

  app.get '/user/:login?', actionProfile
