import {hash, compare} from "bcrypt"
import {Model} from "sequelize"

import freeze from "js-flock/deepFreeze"

import createModel from "lib/db/createModel"
import readOnly from "lib/helper/decorator/readOnly"
import BadRequest from "lib/error/http/BadRequest"

import schema from "./schema"

@createModel(schema, {createdAt: false})
class User extends Model {
  /**
   * @typedef {Object} UserStatus
   *
   * @prop {"inactive"} inactive
   * @prop {"active"} active
   * @prop {"suspended"} suspended
   * @prop {"banned"} banned
   */
  /**
   * User account status
   *
   * @public
   * @static
   * @prop
   *
   * @type {UserStatus}
   */
  @readOnly static statuses = freeze({
    inactive: "inactive",
    active: "active",
    suspended: "suspended",
    banned: "banned"
  })

  /**
   * @typedef UserRole
   *
   * @prop {"super"} super
   * @prop {"developer"} developer
   * @prop {"admin"} admin
   * @prop {"moderator"} moderator
   * @prop {"support"} support
   * @prop {"tech"} tech
   * @prop {"user"} user
   */
  /**
   * Available user roles
   *
   * @public
   * @static
   * @prop
   *
   * @type {UserRole}
   */
  @readOnly static roles = freeze({
    super: "super",
    developer: "developer",
    admin: "admin",
    moderator: "moderator",
    support: "support",
    tech: "tech",
    user: "user",
  })

  /**
   * Find a user by given login
   *
   * @public
   * @static
   * @method
   *
   * @param {string} login
   * @param {Object<string, any>} options
   *
   * @return {Promise<User>}
   */
  static findByLogin(login, options) {
    return this.findOne({...options, where: {login}})
  }

  /**
   * Create a new user and save it to the database
   *
   * @public
   * @static
   * @method
   *
   * @param {Object<string, any>} user
   * @param {Object<string, any>} [options = {}]
   */
  static async create(user, options) {
    user.password = await hash(user.password, 15)

    if (user.role != null) {
      user.role = User.roles.user
    }

    if (user.status != null) {
      user.status = User.statuses.user
    }

    return super.create(user, options)
  }

  /**
   * Compare user's pasword hash with given string
   *
   * @public
   * @method
   *
   * @param {string} string a string to compare password with
   *
   * @return {Promise<boolean>} "true" when given string equals user's password
   */
  comparePassword = async string => compare(string, this.password)

  /**
   * Updates user's avatar
   *
   * @public
   * @method
   *
   * @param {number} avatarId and ID of a file representing user's avatar
   * @param {Object<string, any>} options
   */
  updateAvatar(avatarId, options) {
    return this.setAvatar(avatarId, options)
  }

  /**
   * Remove user's avatar
   *
   * @public
   * @method
   *
   * @param {Object<string, any>} options
   */
  removeAvatar(options) {
    return this.setAvatar(null, options)
  }

  /**
   * Updates user's email address
   *
   * @param {string} email
   * @param {Object<string, any>} options
   *
   * @return {Promise<User>}
   */
  updateEmail(email, options) {
    return this.update({email}, options)
  }

  /**
   * Updates user's password
   *
   * @param {string} oldPassword
   * @param {string} newPassword
   * @param {Object<string, any>} options
   *
   * @return {Promise<User>}
   */
  async updatePassword(oldPassword, newPassword, options) {
    if (await this.comparePassword(oldPassword) === false) {
      throw new BadRequest("Current password is incorrect.")
    }

    return hash(newPassword, 15)
      .then(password => this.update({password}, options))
  }
}

export default User
