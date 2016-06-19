'use strict'

passport = require 'koa-passport'
{Strategy} = require 'passport-local'

i18n = require '../core/i18n'
user = new User = require '../model/User'
{app: {enableSignup}} = require '../core/helpers/configure-helper'

NotFoundException = require '../core/errors/NotFound'
ForbiddenException = require '../core/errors/Forbidden'

passport.serializeUser (iUserId, cb) -> cb null, iUserId
passport.deserializeUser user.getAuthenticated

passport.use new Strategy
  usernameField: 'username'
  passwordField: 'pass',
  user.signin

###
# Response signin page
# 
# GET /auth/signin
###
actionLogin = (next) ->
  if do @isAuthenticated
    return @redirect '/'

  @render 'auth/signin',
    title: i18n.t 'user.title.signin'
    __csrf: @csrf
    __return: @query.return or '/'

  yield next

###
# POST /auth/signin
###
actionSignin = (next) ->
  @redirect @query.return or '/'

  yield next

###
# Response signup page for GET method
# 
# GET /auth/signup
###
actionRegister = (next) ->
  {inviteHash} = @params
  unless enableSignup
    return @render 'auth/signup-disabled',
      title: 'Регистрация временно недоступна'

  if do @isAuthenticated
    return @redirect '/'

  @render 'auth/signup',
    title: i18n.t 'user.title.signup'
    __csrf: @csrf
    __return: @query.return or '/'

    yield next

###
# Register new user
# 
# POST /auth/signup
###
actionSignup = (next) ->
  {inviteHash} = @params
  unless enableSignup
    throw new ForbiddenException "Unauthorized access to registration form."

  {login, email, pass, repass} = @request.body

  yield user.signup login, email, pass, repass

  @redirect @query.return or '/'

  yield next

###
# Confirm account via email
#
# GET /auth/confirm/:confirmationHash
###
actionConfirm = (next) ->
  {confirmationHash} = @params

  unless yield user.activate confirmationHash
    @render 'auth/confirm-fail',
      title: 'Ошибка при подтверждении адреса электронной почты'
    return

  @render 'auth/confirm-success',
    title: 'Регистрация успешно завершена'

  yield next

###
# Logout
#
# POST /auth/logout
###
actionLogout = (next) ->
  do @logout
  @redirect @query.return or '/'

  yield next

module.exports = (route) ->
  route '/auth/signin'
    .get actionLogin
    .post passport.authenticate('local'), actionSignin

  route '/auth/signup/:inviteHash?'
    .get actionRegister
    .post actionSignup

  # Confirmation link
  route '/auth/confirm/:confirmationHash'
    .get actionConfirm

  route '/auth/logout'
    .get actionLogout

  return
