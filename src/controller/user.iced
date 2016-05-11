'use strict'

i18n = require '../core/i18n'
user = new User = require '../model/User'

NotFoundException = require '../core/errors/NotFoundException'
ForbiddenException = require '../core/errors/ForbiddenException'

###
# List of all registered users
# 
# GET /users/:page?
###
actionUsers = (req, res) ->
  res.render 'user/users',
    title: 'Пользователи'

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
      username: oUserData.login
    profile: oUserData

actionSettings = (req, res, next) ->
  unless do req.isAuthenticated
    return next new ForbiddenException "Unauthorized access to user settings."
  res.render 'user/settings',
    title: i18n.t 'user.title.settings'

module.exports = (app) ->
  app.get '/users/:page?', actionUsers

  app.get '/user/:login?', actionProfile

  app.get '/settings', actionSettings

  return
