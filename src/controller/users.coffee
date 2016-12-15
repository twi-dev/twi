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
actionUsers = (ctx) -> await return

###
# Response user profile
# 
# GET /users/profile/:login?
###
actionProfile = (ctx) ->
  ctx.body = await user.profile ctx?.params?.login
  await return

###
# Settings
#
# GET /users/settings
###
actionSettings = (ctx) ->
  unless do ctx.req.isAuthenticated
    throw new ForbiddenException "Unauthorized access to user settings."

  # await ctx.render "user/settings",
  #   title: i18n.t "user.title.settings"

  await return

module.exports = (r) ->
  r "/profile/:login?"
    .get actionProfile

  r "/settings"
    .get actionSettings

  r "/:page?"
    .get actionUsers

  return
