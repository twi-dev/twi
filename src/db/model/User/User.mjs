import {hash, compare} from "bcryptjs"

import freeze from "js-flock/deepFreeze"

import readOnly from "core/helper/decorator/readOnly"

import {createModel, Model} from "core/db"

import schema from "./schema"

@createModel(schema)
class User extends Model {
  /**
   * User account status
   */
  @readOnly static statuses = freeze({
    unactivated: 0,
    activated: 1,
    suspended: 2,
    banned: 3
  })

  /**
   * Available user roles
   *
   * @return {object}
   */
  @readOnly static roles = freeze({
    super: 0,
    developer: 1,
    admin: 2,
    moderator: 3,
    support: 4,
    tech: 5,
    user: 6,
  })

  /**
   * Create a new regular user.
   *
   * @param {object} user – user information
   * @param {object} [options = {}]
   *
   * @return {object}
   */
  static async create(user, options) {
    const password = await hash(user.password, 15)

    if (user.role != null) {
      user.role = User.roles.user
    }

    if (user.status != null) {
      user.status = User.statuses.user
    }

    return super.create({...user, password}, options)
  }

  static async createMany() {
    throw new Error(
      "This method is not allowed in this class. Use User.createOne instead."
    )
  }

  /**
   * Get user by his login
   *
   * @param {string} login
   *
   * @return {object}
   *
   * @throws {NotFound} – when user is not found
   */
  static findByLogin(login, options) {
    return this.findOne({login: new RegExp(`^${login}$`, "i")}, options)
  }

  static findByEmail(email, options) {
    return this.findOne({email}, options)
  }

  /**
   * Updates viewer's avatar
   */
  async updateAvatar(avatar, options) {
    return this.update({$set: {avatar}}, options)
  }

  /**
   * Removes viewer's avatar
   */
  async removeAvatar() {
    return this.update({$set: {avatar: null}})
  }

  comparePassword = async string => compare(string, this.password)

  /**
   * Get user role name
   *
   * @private
   */
  get roleName() {
    return this._findKey(User.roles, this.role)
  }

  /**
   * Get user status name
   *
   * @private
   */
  get statusName() {
    return this._findKey(User.statuses, this.status)
  }

  /**
   * Check if given user account have banned status
   *
   * @return {boolean}
   */
  get isBanned() {
    return this.status === User.statuses.banned
  }

  /**
   * Check if given user account have suspended status
   *
   * @return {boolean}
   */
  get isSuspended() {
    return this.status === User.statuses.suspended
  }

  /**
   * Check if given user account have activated status
   *
   * @return {boolean}
   */
  get isActivated() {
    return this.status === User.statuses.activated
  }

  /**
   * Check if given user account have unactivated status
   *
   * @return {boolean}
   */
  get isUnactivated() {
    return this.status === User.statuses.unactivated
  }

  /**
   * Check if user is "USER"
   *
   * @return {boolean}
   */
  get isUser() {
    return this.role === User.roles.user
  }

  /**
   * Check if user is "MODERATOR"
   *
   * @return {boolean}
   */
  get isModerator() {
    return this.role === User.roles.moderator
  }

  /**
   * Check if user is "ADMIN"
   *
   * @return {boolean}
   */
  get isAdmin() {
    return this.role === User.roles.admin
  }

  /**
   * Check if user is "SUPER"
   *
   * @return {boolean}
   */
  get isSuper() {
    return this.role === User.roles.super
  }
}

export default User
