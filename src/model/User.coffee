'use strict'

_ = require 'lodash'
co = require 'co'
moment = require 'moment'
bcrypt = require '../core/helpers/co-bcrypt'

model = require '../core/database'
user = model 'user', require '../core/database/schemas/user'
contacts = model 'contacts', require '../core/database/schemas/contacts'

ForbiddenException = require '../core/errors/Forbidden'
NotFoundException = require '../core/errors/NotFound'

# Associate contacts with users
user.hasOne contacts,
  foreignKey: 'userId'
  as: 'contacts'

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
    console.log 'Huh?'
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
            console.log 'is compare?'
            return cb null, no

          cb null, userId
        catch err
          Promise.reject err
    .catch (err) -> cb err

module.exports = User
