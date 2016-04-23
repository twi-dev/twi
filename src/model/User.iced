'use strict'

Promise = require 'pinkie-promise'
_ = require 'lodash'
validate = require 'validate.js'
moment = require 'moment'
bcrypt = require 'bcryptjs'

NotFoundException = require '../core/errors/NotFoundException'
InternalException = require '../core/errors/InternalException'
ForbiddenException = require '../core/errors/ForbiddenException'

model = require '../core/database'
__oUserStructure = require '../core/database/structure/user'

model = model 'user', __oUserStructure model.dataTypes
__oUserStructure = null

class User
  constructor: ->
    ###
    # Статус пользователя:
    # - Неактивен
    # - Активен
    # - Забанен
    # - Удалён
    ###
    @STATUS_INACTIVE = 0
    @STATUS_ACTIVE = 1
    @STATUS_BANNED = 2
    @STATUS_DELETED = 3

    ###
    # Роли пользователей:
    # - Пользователь
    # - Модератор
    # - Администратор
    # - Рут
    ###
    @ROLE_USER = 0
    @ROLE_MODERATOR = 1
    @ROLE_ADMIN = 2
    @ROLE_ROOT = 3

    ###
    # Зарезервированные логины.
    ###
    @RESERVED = [
      'admin'
      'moderator'
      'root'
    ]

  _getUser: (oParams, cb) ->
    model.findOne oParams
    .then (oResponsedData) -> cb null, oResponsedData
    .catch (err) -> cb err

  _getUsers: (oParams, iLimit, cb) ->
    model.findAll oParams
    .then (oResponsedData) -> cb null, oResponsedData
    .catch (err) -> cb err

  ###
  # Get user by given login
  ###
  getByLogin: (sLogin, cb) ->
    await @_getUser
      attributes: [
        ['userId', 'id']
        ['login', 'username']
        ['password', 'pass']
      ]
      where:
        login: sLogin,
      defer err, oUserData
    return cb err if err?

    cb null, oUserData.dataValues

  getByEmail: (sEmail, cb) ->

  profile: (sLogin, cb) ->
    await @_getUser
      attributes: [
        ['login', 'username']
      ]
      where:
        login: sLogin,
      defer err, oUserData
    return cb err if err?

    unless oUserData?
      return cb new NotFoundException "Unknown user \"#{sLogin}\"."

    cb null, oUserData.dataValues

  register: (sLogin, sEmail, sPass, cb) ->
    await bcrypt.hash sPass, 10,
      defer err, sPass
    return cb err if err?

    model.create
      login: sLogin
      email: sEmail
      password: sPass
      registeredAt: do moment().format
      role: @ROLE_USER
      status: @STATUS_ACTIVE
    .then -> cb null
    .catch (err) -> cb err

  getAuthorizedUser: (sId, cb) =>
    await @_getUser
      attributes: [
        ['login', 'username']
        'role',
        'status'
      ]
      where:
        userId: sId,
      defer err, oUserData
    return cb err if err?

    cb null, oUserData.dataValues

  ###
  # Notice: "=>" because this function used for passport.js in LocalStrategy.
  ###
  auth: (sUsername, sPass, cb) =>
    await @getByLogin sUsername,
      defer err, oUserData
    return cb err if err?

    await bcrypt.compare sPass, oUserData.pass,
      defer err, bIsCompare
    return err if err?

    return cb null, no unless bIsCompare

    return cb null, oUserData

module.exports = User
