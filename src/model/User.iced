'use strict'

model = require '../core/server/model'
model = model 'user'
_ = require 'lodash'

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

    @_aAttributes = [
        'login'
    ]

  getUserByLogin: (sLogin, cb) ->

module.exports = User
