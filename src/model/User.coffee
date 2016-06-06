'use strict'

_ = require 'lodash'
co = require 'co'
redis = require 'then-redis'
moment = require 'moment'
crypto = require 'crypto'
bcrypt = require '../core/helpers/co-bcrypt'
mailer = require '../core/mail/mailer'
model = require '../core/database'
user = model 'user', require '../core/database/schemas/user'
contacts = model 'contacts', require '../core/database/schemas/contacts'
validationHelper = require '../core/helpers/validation-helper'
redis = do redis.createClient

ForbiddenException = require '../core/errors/Forbidden'
NotFoundException = require '../core/errors/NotFound'

{info} = require '../core/logger'

# Associate contacts with users
user.belongsTo contacts,
  as: 'contacts'
  foreignKey: 'userId'

###
# Expiry period for confirmation link
#
# By default is 24 hours
###
CONFIRMATION_EXPIRE = 60 * 60 * 24

###
# Sending confirmation message via email
###
confirm = (sEmail, sId) ->
  sHash = crypto.createHash 'sha256'
    .update "#{+moment()}#{sEmail}"
    .digest 'hex'

  yield redis.set sHash, sId, 'EX', CONFIRMATION_EXPIRE
  yield mailer.send sEmail, "Добро пожаловать!", 'welcome',
    activationLink: sHash
  info "Confirmation message has been sent to #{sEmail}"
  return

class User
  constructor: ->
    ###
    # Status:
    #   - Inactive
    #   - Active
    #   - Banned
    #   - Deleted
    ###
    @STATUS_INACTIVE = 0
    @STATUS_ACTIVE = 1
    @STATUS_BANNED = 2
    @STATUS_DELETED = 3

    ###
    # Roles:
    #   - User
    #   - Moderator
    #   - Admin
    #   - Root
    ###
    @ROLE_USER = 0
    @ROLE_MODERATOR = 1
    @ROLE_ADMIN = 2
    @ROLE_ROOT = 3

    @GENDER_MALE = 1
    @GENDER_FEMALE = 0

    ###
    # Reserved.
    ###
    @RESERVED = [
      'admin'
      'moderator'
      'root'
    ]

  _getUser: (oOptions) ->
    yield user.findOne oOptions

  profile: (sUserId) ->
    oUserData = yield @_getUser
      attributes:
        exclude: [
          'userId'
          'email'
          'password'
          'role'
        ]
      include: [
        model: contacts
        as: 'contacts'
        attributes:
          exclude: [
            'contactsId'
            'userId'
          ]
      ]
      where:
        login: sUserId

    # Throwing error if user is not found
    unless oUserData?
      throw new NotFoundException "User \"#{sUserId}\" is not found."

    yield oUserData.get plain: yes

  signup: (sLogin, sEmail, sPass, sRepass) ->
    # unless sPass is sRepass and validationHelper.isValidPassword sPass
    #   throw new UnauthorizedException ""

    oUserData = yield user.create
      login: sLogin
      email: sEmail
      password: (yield bcrypt.hash sPass, 10)
      registeredAt: do moment().format
      role: @ROLE_USER
      status: @STATUS_INACTIVE

    {userId} = oUserData.get plain: yes
    yield contacts.create userId: userId
    yield confirm sEmail, userId

  activate: (sHash) ->
    sId = yield redis.get sHash
    return no unless sId?

    yield user.update {
      status: @STATUS_ACTIVE
    }, {
      where:
        userId: sId
    }

    yield redis.del sHash

    return yes

  getAuthenticated: (id, cb) =>
    user.findOne
      attributes: [
        'userId'
        'login'
        'role'
        'status'
      ]
      where:
        userId: id
    .then (oUserData) -> cb null, oUserData.get plain: yes
    .catch (err) -> cb err

  ###
  # Auth user by his username + password pair
  #
  # @param string sUsername
  # @param string sPass
  #
  # Notice: "=>" because this function used for passport.js in LocalStrategy.
  ###
  auth: (sUsername, sPass, cb) =>
    user.findOne
      attributes: [
        'userId'
        'password'
      ]
      where:
        login: sUsername
    .then (oUserData) ->
      {password, userId} = oUserData.get plain: yes
      co ->
        try
          unless yield bcrypt.compare sPass, password
            return cb null, no

          cb null, userId
        catch err
          Promise.reject err
    .catch (err) -> cb err

module.exports = User
