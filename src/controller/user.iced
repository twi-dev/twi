'use strict'

moment = require 'moment'
passport = require 'passport'

{Strategy} = require 'passport-local'

i18n = require '../core/i18n'
user = new User = require '../model/User'

NotFoundException = require '../core/errors/NotFoundException'
ForbiddenException = require '../core/errors/ForbiddenException'

###
# Response login page
# 
# GET /login
###
actionLogin = (req, res) ->
  if do req.isAuthenticated
    return res.redirect '/'

  res.render 'user/login',
    title: i18n.t 'user.title.signin'
    __redirectUri: req.query.return or '/'

###
# POST /login
###
actionSignin = (req, res, next) ->
  res.redirect '/'

###
# Response login page for GET method
# 
# GET /signup
###
actionRegister = (req, res) ->
  if do req.isAuthenticated
    return res.redirect '/'

  res.render 'user/signup',
    title: i18n.t 'user.title.signup'
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

actionLogout = (req, res, next) ->
  do req.logout
  res.redirect req.query.return or '/'

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
  await user.profile login,
    defer err, oUserData
  return next err if err?

  res.render 'user/profile',
    title: i18n.t 'user.title.profile',
      username: oUserData.username
    profile: oUserData

actionSettings = (req, res, next) ->
  unless do req.isAuthenticated
    return next new ForbiddenException "Unauthorized access to user settings."
  res.render 'user/settings',
    title: i18n.t 'user.title.settings'

module.exports = (app) ->
  passport.serializeUser (oUser, cb) -> cb null, oUser.id
  passport.deserializeUser user.getAuthorizedUser

  passport.use new Strategy
    usernameField: 'email'
    passwordField: 'pass',
    # failureRedirect: app.locals.__redirectUri or '/login?return=/',
    user.auth

  # Login
  app.route '/login'
    .get actionLogin
    .post passport.authenticate('local'), actionSignin

  # Signup
  app.route '/signup'
    .get actionRegister
    .post actionSignup

  # Logout
  app.get '/logout', actionLogout

  app.get '/users/:page?', actionUsers

  app.get '/user/:login?', actionProfile

  app.get '/settings', actionSettings
