"use strict"

i18n = require "../core/i18n"
user = require "../model/User"

NotFoundException = require "../core/error/NotFound"
ForbiddenException = require "../core/error/Forbidden"

###
# List of all registered users
# 
# GET /users/:page?
###
actionUsers = (ctx) ->
  await ctx.render "user/users",
    title: "Users"

  await return

###
# Response user profile
# 
# GET /user/:login?
###
actionProfile = (ctx) ->
  {login} = ctx.params

  oUserData = await user.profile login

  await ctx.render "user/profile",
    title: i18n.t "user.title.profile",
      username: oUserData.login
    profile: oUserData

  await return

actionSettings = (ctx) ->
  unless do ctx.req.isAuthenticated
    throw new ForbiddenException "Unauthorized access to user settings."

  await ctx.render "user/settings",
    title: i18n.t "user.title.settings"

  await return

module.exports = (r) ->
  r "/users/:page?"
    .get actionUsers

  r "/user/:login?"
    .get actionProfile

  r "/settings"
    .get actionSettings

  return
