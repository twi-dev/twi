'use strict'

{__ROOT__} = require '../core/components'
Model = require __ROOT__ + '/core/server/Model'
_ = require 'lodash'

class User extends Model
  constructor: ->
    super null

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

  tableName: -> return 'user'

  getUserByLogin: (sLogin, cb) ->
    # @model.findOne
    #   attributes: ['login']
    #   where:
    #     login: sLogin
    # .then (oData) -> cb null, oData.dataValues.login
    # .catch (err) -> throw err
    await @findOne sLogin, defer err, oData
    console.log err if err
    cb null, oData

module.exports = User