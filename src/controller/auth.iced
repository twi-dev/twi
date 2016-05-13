'use strict'

passport = require 'passport'
{Strategy} = require 'passport-local'

i18n = require '../core/i18n'
user = new User = require '../model/User'

NotFoundException = require '../core/errors/NotFoundException'
ForbiddenException = require '../core/errors/ForbiddenException'

###
# Response signin page
# 
# GET /auth/signin
###
actionLogin = (req, res) ->
  if do req.isAuthenticated
    return res.redirect '/'

  res.render 'auth/signin',
    title: i18n.t 'user.title.signin'
    __csrf: do req.csrfToken
    __redirectUri: req.query.return or '/'

###
# POST /auth/signin
###
actionSignin = (req, res, next) ->
  res.redirect req.query.return or '/'

###
# Response signup page for GET method
# 
# GET /auth/signup
###
actionRegister = (req, res) ->
  if do req.isAuthenticated
    return res.redirect '/'

  res.render 'auth/signup',
    title: i18n.t 'user.title.signup'
    __csrf: do req.csrfToken
    __redirectUri: req.query.return or '/'

###
# Register new user
# 
# POST /auth/signup
###
actionSignup = (req, res, next) ->
  {login, email, pass} = req.body

  await user.register login, email, pass,
    defer err
  return next err if err?

  res.redirect req.query.return or '/'

###
# Confirm account via email
#
# GET /auth/confirm/:confirmationHash
###
actionConfirm = (req, res, next) ->
  {confirmationHash} = req.params

  await user.activate confirmationHash,
    defer err, bIsConfirmed
  return next err if err?

  res.render 'auth/confirm-success',
    title: 'Регистрация успешно завершена'

###
# Logout
#
# POST /auth/logout
###
actionLogout = (req, res, next) ->
  do req.logout
  res.redirect req.query.return or '/'

module.exports = (app) ->
  passport.serializeUser (oUser, cb) -> cb null, oUser.id
  passport.deserializeUser user.getAuthorizedUser

  passport.use new Strategy
    usernameField: 'email'
    passwordField: 'pass',
    user.auth

  app.route '/auth/signin'
    .get actionLogin
    .post passport.authenticate('local'), actionSignin

  app.route '/auth/signup'
    .get actionRegister
    .post actionSignup

  # Confirmation link
  app.get '/auth/confirm/:confirmationHash', actionConfirm

  app.get '/auth/logout', actionLogout

  return
