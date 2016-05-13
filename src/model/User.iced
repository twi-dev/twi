'use strict'

Promise = require 'pinkie-promise'
_ = require 'lodash'
validate = require 'validate.js'
moment = require 'moment'
bcrypt = require 'bcryptjs'
crypto = require 'crypto'
redis = require 'redis'
mailer = require '../core/mail/mailer'
{info} = require '../core/logger'

UnauthorisedException = require '../core/errors/UnauthorisedException'
ForbiddenException = require '../core/errors/ForbiddenException'
NotFoundException = require '../core/errors/NotFoundException'
InternalException = require '../core/errors/InternalException'

model = require '../core/database'
__oUserStructure = require '../core/database/structure/user'
__oContactsStructure = require '../core/database/structure/contacts'

redis = do redis.createClient
user = model 'user', __oUserStructure model.dataTypes
contacts = model 'contacts', __oContactsStructure model.dataTypes

###
# Expiry period for confirmation link
#
# By default is 24 hours
###
CONFIRMATION_EXPIRE = 60 * 60 * 24

__oUserStructure = null
__oContactsStructure = null

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

  _getUser: (oParams, cb) ->
    user.findOne oParams
      .asCallback cb

  _getUsers: (oParams, iLimit, cb) ->
    user.findAll oParams
      .asCallback cb

  confirm: (sEmail, sLogin, cb) ->
    sHash = crypto.createHash 'sha256'
      .update "#{+moment()}#{sEmail}"
      .digest 'hex'

    await redis.set sHash, sLogin, 'EX', CONFIRMATION_EXPIRE,
      defer err
    return cb err if err?

    # send => to, subject, template name, options, cb
    await mailer.send sEmail, 'Добро пожаловать!', 'welcome',
      activationLink: sHash,
      defer err, oInfo
    return cb err if err?

    info "Confirmation message has been sent to #{sEmail}"

    cb null

  ###
  # Activate user account
  ###
  activate: (sHash, cb) ->
    await redis.get sHash,
      defer err, sLogin
    return cb err if err?

    unless sLogin?
      return cb null, false

    user.update {
      status: @STATUS_ACTIVE
    }, {
      where:
        login: sLogin
    }

    await redis.del sHash,
      defer err
    return err if err?

    cb null, true

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
      attributes:
        exclude: [
          'userId'
          'email'
          'password'
          'role'
        ]
      where:
        login: sLogin
      include: [
        model: contacts
        as: 'contacts'
        attributes:
          exclude: [
            'contactsId'
            'userId'
        ]
      ],
      defer err, oUserData
    return cb err if err?

    unless oUserData?
      return cb new NotFoundException "Unknown user \"#{sLogin}\"."

    oUserData = oUserData.get plain: yes

    cb null, oUserData

  register: (sLogin, sEmail, sPass, cb) ->
    [sLogin, sEmail, sPass] = (
      do v.trim for v in [sLogin, sEmail, sPass]
    )

    unless /^[0-9a-z-_]+$/i.test sLogin
      cb new UnauthorisedException "Wrong login format."
      return

    await bcrypt.hash sPass, 10,
      defer err, sPass
    return cb err if err?

    if (__res = validate email: sEmail, {email:{ email: yes, presence: yes}})?
      cb new UnauthorisedException "Registration error.",
        valudationError: __res
      return

    await user.create
      login: sLogin
      email: sEmail
      password: sPass
      registeredAt: do moment().format
      role: @ROLE_USER
      status: @STATUS_INACTIVE
    .asCallback defer err

    return cb err if err?

    await @_getUser
      attributes: [
        'userId'
      ]
      where:
        email: sEmail,
      defer err, oUserData

    return cb err if err?

    oUserData = oUserData.get plain: yes
    contacts.create userId: oUserData.userId
      .asCallback cb

    await @confirm sEmail, sLogin,
      defer err
    return cb err if err?

    cb null

  ###
  # Notice: "=>" because this function used for passport.js in LocalStrategy.
  ###
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
  # Auth user by his login + password pair
  #
  # @param string sUsername
  # @param string sPass
  #
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
