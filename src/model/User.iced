'use strict'

_ = require 'lodash'
validate = require 'validate.js'

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

  _getUsers: (oParams, iLimit, cb) ->

  getByLogin: (sLogin, cb) ->
    model.findOne
      where:
        login: sLogin
    .then (oResponsedData) ->
      unless oResponsedData?
        cb new NotFoundException
        return

      cb null, oResponsedData.dataValues
    .catch (err) -> cb err

  getByEmail: (sEmail, cb) ->

  auth: (sEmail, sPassword, cb) ->

  register: (sLogin, sEmail, sPassword, cb) ->

module.exports = User
