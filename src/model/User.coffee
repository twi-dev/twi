"use strict"

_ = require "lodash"
co = require "co"
redis = require "then-redis"
moment = require "moment"
crypto = require "crypto"
bcrypt = require "../core/helper/bcrypt"
mailer = require "../core/mail/mailer"

{model, user, contacts} = require "../core/app/model"
{isEmail, isValidPassword} = require "../core/helper/validation"
{t} = require "../core/i18n"

ForbiddenException = require "../core/error/Forbidden"
NotFoundException = require "../core/error/NotFound"

redis = do redis.createClient
{info} = require "../core/logger"

# Associate contacts with users
user.hasOne contacts, foreignKey: "user_id"
contacts.belongsTo user, foreignKey: "user_id"

###
# Expiry period for confirmation link
#
# By default is 24 hours
###
CONFIRMATION_EXPIRE = 60 * 60 * 24

###
# Status:
#   - Inactive
#   - Active
#   - Banned
#   - Deleted
###
STATUS_INACTIVE = 0
STATUS_ACTIVE = 1
STATUS_BANNED = 2
STATUS_DELETED = 3

###
# Roles:
#   - User
#   - Moderator
#   - Admin
#   - Root
###
roles =
  USER: 0
  MODERATOR: 1
  ADMIN: 2
  ROOT: 3

GENDER_MALE = 1
GENDER_FEMALE = 0

###
# Reserved usernames
###
RESERVED = [
  "admin"
  "moderator"
  "root"
  "support"
  "dev"
]

# Authenticate user by login/email and pass
_authenticate = (username, pass) ->
  opts =
    attributes: [
      "userId"
      "password"
    ]
    where: (if isEmail username then email: username else login: username)

  userData = yield user.findOne opts

  return null unless userData?

  return null unless yield bcrypt.compare pass, userData.password

  return userData.userId

###
# Sending confirmation message via email
###
confirm = (email, sId) ->
  hash = crypto.createHash "sha256"
    .update "#{+moment()}#{email}"
    .digest "hex"

  await redis.set hash, sId, "EX", CONFIRMATION_EXPIRE
  await mailer.send email, t("mail.welcome.subject"), "welcome",
    activationLink: hash
  info "Confirmation message has been sent to #{email}"
  return

signup = (login, email, pass, repass) ->
  userData = await user.create {
      login, email
      password: await bcrypt.hash pass, 10
      registeredAt: do moment().format
      role: roles.USER
      status: STATUS_INACTIVE
    }

  {userId} = userData.get plain: yes
  await contacts.create userId: userId
  await confirm sEmail, userId

activate = (hash) ->
  userId = await redis.get hash
  return no unless userId?

  await user.update {
    status: @STATUS_ACTIVE
  }, {
    where:
      userId: userId
  }

  await redis.del hash

  return yes

###
# Auth user by his username + password pair
#
# @param string sUsername
# @param string sPass
###
signin = (sUsername, sPass, cb) ->
  co _authenticate sUsername, sPass
    .then (userId) -> if userId? then cb null, userId else cb null, no
    .catch (err) -> cb err
###
# Get authenticated user
###
getAuthenticated = (id, cb) ->
  user.findOne
    attributes: [
      "userId"
      "login"
      "role"
      "status"
    ]
    where:
      userId: id
  .then (userData) -> cb null, userData.get plain: yes
  .catch (err) -> cb err

###
# Get user profile
###
profile = (userId) ->
  userData = await user.findOne
    raw: yes
    attributes:
      exclude: [
        "contactsId"
        "userId"
        "email"
        "password"
        "role"
      ]
    include: [
      model: contacts
      attributes:
        exclude: [
          "contactsId"
          "userId"
        ]
    ]
    where:
      login: userId


  # Throwing error if user is not found
  unless userData?
    throw new NotFoundException "User \"#{sUserId}\" is not found."

  return userData

module.exports = {
  signup
  activate
  signin
  getAuthenticated
  profile
}
