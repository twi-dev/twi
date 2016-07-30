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
actionUsers = ->
  @render 'user/users',
    title: 'Users'

  yield return

###
# Response user profile
# 
# GET /user/:login?
###
actionProfile = ->
  {login} = @params

  oUserData = yield user.profile login

  @render 'user/profile',
    title: i18n.t 'user.title.profile',
      username: oUserData.login
    profile: oUserData

  yield return

actionSettings = ->
  unless do @req.isAuthenticated
    throw new ForbiddenException "Unauthorized access to user settings."

  @render 'user/settings',
    title: i18n.t 'user.title.settings'

  yield return

module.exports = (r) ->
  r '/users/:page?'
    .get actionUsers

  r '/user/:login?'
    .get actionProfile

  r '/settings'
    .get actionSettings

  return
