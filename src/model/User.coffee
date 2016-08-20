'use strict'

_ = require 'lodash'
co = require 'co'
redis = require 'then-redis'
moment = require 'moment'
crypto = require 'crypto'
bcrypt = require '../core/helper/bcrypt'
mailer = require '../core/mail/mailer'
model = require '../core/database'
user = model 'user', require '../core/database/schemas/user'
contacts = model 'contacts', require '../core/database/schemas/contacts'
{isEmail, isValidPassword} = require '../core/helper/validation'

ForbiddenException = require '../core/errors/Forbidden'
NotFoundException = require '../core/errors/NotFound'

redis = do redis.createClient
{info} = require '../core/logger'

# Associate contacts with users
contacts.hasOne user, foreignKey: 'contacts_id'
user.belongsTo contacts, foreignKey: 'contacts_id'

# Authenticate user by login/email and pass
_authenticate = (sUsername, sPass) ->
  oOptions =
    attributes: [
      'userId'
      'password'
    ]
    where: (if isEmail sUsername then email: sUsername else login: sUsername)

  oUserData = yield user.findOne oOptions

  return null unless oUserData?

  return null unless yield bcrypt.compare sPass, oUserData.password

  return oUserData.userId

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

  await redis.set sHash, sId, 'EX', CONFIRMATION_EXPIRE
  await mailer.send sEmail, "Добро пожаловать!", 'welcome',
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
    await Promise.resolve user.findOne oOptions

  profile: (sUserId) ->
    oUserData = await @_getUser
      raw: yes
      attributes:
        exclude: [
          'contactsId'
          'userId'
          'email'
          'password'
          'role'
        ]
      include: [
        model: contacts
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

    return oUserData

  signup: (sLogin, sEmail, sPass, sRepass) ->
    oUserData = await Promise.resolve user.create
      login: sLogin
      email: sEmail
      password: (await bcrypt.hash sPass, 10)
      registeredAt: do moment().format
      role: @ROLE_USER
      status: @STATUS_INACTIVE

    {userId} = oUserData.get plain: yes
    await contacts.create userId: userId
    await confirm sEmail, userId

  activate: (sHash) ->
    sId = await redis.get sHash
    return no unless sId?

    await Promise.resolve user.update {
      status: @STATUS_ACTIVE
    }, {
      where:
        userId: sId
    }

    await redis.del sHash

    return yes

  getAuthenticated: (id, cb) ->
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
  ###
  signin: (sUsername, sPass, cb) ->
    co _authenticate sUsername, sPass
      .then (userId) -> if userId? then cb null, userId else cb null, no
      .catch (err) -> cb err

module.exports = User
