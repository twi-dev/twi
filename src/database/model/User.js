import {hash} from "bcryptjs"
import invariant from "@octetstream/invariant"

import {createModel, Model} from "core/database"

import NotFound from "core/error/http/NotFound"

@createModel
class User extends Model {
  /**
   * USer account status
   */
  static get statuses() {
    return {
      unactivated: 0,
      activated: 1,
      suspended: 2,
      banned: 3
    }
  }

  /**
   * Available user roles
   *
   * @return {object}
   */
  static get roles() {
    return {
      su: 0,
      admin: 1,
      mod: 2,
      user: 3,
    }
  }

  /**
   * Create a new regular user.
   *
   * @param {object} – user information
   *
   * @return {object}
   */
  static async createOne(user) {
    const password = await hash(user.password, 15)

    const role = User.roles.user

    return await super.createOne({...user, password, role})
  }

  // NOTE: Just an unallowed method
  static async createMany() {
    invariant(
      true,
      "This method is not allowed in this class. Use %s.createOne instead.",
      User.name
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
  static async findOneByLogin(login) {
    login = new RegExp(`^${login}$`, "i")

    const user = await this.findOne().where({login}).exec()

    invariant(!user, NotFound, "Can't find user with login %s.", String(login))

    return await user.toJS()
  }

  /**
   * Get user role name
   *
   * @private
   */
  get __role() {
    return this._findKey(User.roles, this.role)
  }

  /**
   * Get user status name
   *
   * @private
   */
  get __status() {
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
   * Check if user is "MOD"
   *
   * @return {boolean}
   */
  get isMod() {
    return this.role === User.roles.mod
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
   * Check if user is "SU"
   *
   * @return {boolean}
   */
  get isSu() {
    return this.role === User.roles.su
  }

  /**
   * @see Model#toJS
   */
  async toJS(options) {
    const user = await super.toJS(options)

    const role = this.__role.toUpperCase()
    const status = this.__status.toUpperCase()

    return {
      ...user, role, status
    }
  }
}

export default User
