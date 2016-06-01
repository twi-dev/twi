'use strict'

i18n = require '../core/i18n'
user = new User = require '../model/User'

NotFoundException = require '../core/errors/NotFound'
ForbiddenException = require '../core/errors/Forbidden'

###
# List of all registered users
# 
# GET /users/:page?
###
actionUsers = (next) ->
  @render 'user/users',
    title: 'Users'

  yield next

###
# Response user profile
# 
# GET /user/:login?
###
actionProfile = (next) ->
  {login} = @params

  oUserData = yield user.profile login

  @render 'user/profile',
    title: i18n.t 'user.title.profile',
      username: oUserData.login
    profile: oUserData

  yield next

actionSettings = (next) ->
  unless do @req.isAuthenticated
    throw new ForbiddenException "Unauthorized access to user settings."

  @render 'user/settings',
    title: i18n.t 'user.title.settings'

  yield next

module.exports = (route) ->
  route '/users/:page?'
    .get actionUsers

  route '/user/:login?'
    .get actionProfile

  route '/settings'
    .get actionSettings

  return
