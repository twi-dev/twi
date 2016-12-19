"use strict"

passport = require "koa-passport"
{Strategy} = require "passport-local"

{t} = i18n = require "../core/i18n"
user = require "../model/User"
{app: {enableSignup}} = require "../core/helper/configure"

NotFoundException = require "../core/error/NotFound"
ForbiddenException = require "../core/error/Forbidden"

passport.serializeUser (iUserId, cb) -> cb null, iUserId
passport.deserializeUser user.getAuthenticated

passport.use new Strategy
  usernameField: "username"
  passwordField: "pass",
  user.signin

###
# Response signin page
# 
# POST /auth/login
###
actionLogin = (ctx) ->
  # ctx.redirect ctx.query.return or "/"
  {username, password} = ctx.request.body

  ctx.body = {username, password}

  await return

###
# Register new user
# 
# POST /auth/signup
###
actionSignup = (ctx) ->
  {inviteHash} = ctx.params
  unless enableSignup
    throw new ForbiddenException "Unauthorized access to registration form."

  {login, email, pass, repass} = ctx.request.body

  await user.signup login, email, pass, repass

  ctx.redirect ctx.query.return or "/"

  await return

###
# Confirm account via email
#
# GET /auth/confirm/:confirmationHash
###
actionConfirm = (ctx) ->
  {confirmationHash} = ctx.params

  unless await user.activate confirmationHash
    await ctx.render "auth/confirm-fail",
      title: t "auth.title.confirm.fail"
    return

  await ctx.render "auth/confirm-success",
    title: t "auth.title.confirm.success"

  await return

###
# Logout
#
# POST /auth/logout
###
actionLogout = (ctx) ->
  do ctx.logout
  ctx.redirect ctx.query.return or "/"

  await return

module.exports = (r) ->
  r "/login"
    # .get actionLogin
    # .post passport.authenticate("local"), actionLogin
    .post actionLogin

  r "/signup/:inviteHash?"
    # .get actionRegister
    .post actionSignup

  # Confirmation link
  # r "/confirm/:confirmationHash"
  #   .get actionConfirm

  # r "/logout"
  #   .get actionLogout

  return
