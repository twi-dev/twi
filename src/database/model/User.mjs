import {deprecate} from "core-decorators"
import {hash, compare} from "bcryptjs"

import invariant from "@octetstream/invariant"
import isPlainObject from "lodash/isPlainObject"
import isEmpty from "lodash/isEmpty"

import {createModel, Model} from "core/database"

import fromFields from "core/database/decorator/selectFromGraphQLFields"
import toObject from "core/database/decorator/toObject"

import NotFound from "core/error/http/NotFound"

@createModel
class User extends Model {
  /**
   * User account status
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
   * @param {object} user – user information
   * @param {object} [options = {}]
   *
   * @return {object}
   */
  static async createOne({args, options} = {}) {
    const {user} = args || {}

    invariant(
      !isPlainObject(user), TypeError,
      "User data information should be passed as plain JavaScript object."
    )

    invariant(isEmpty(user), TypeError, "User information cannot be empty.")

    const password = await hash(user.password, 15)

    if (user.role != null) {
      user.role = User.roles.user
    }

    if (user.status != null) {
      user.status = User.statuses.user
    }

    return super.createOne({...user, password}, options)
  }

  static async createMany() {
    invariant(
      true,
      "This method is not allowed in this class. Use %s.createOne instead.",
      User.name
    )
  }

  @toObject @fromFields static findMany({args}) {
    return super.findMany(args)
  }

  @fromFields static _findByLogin({args}) {
    const login = new RegExp(`^${args.login}$`, "i")

    return super.findOne({login})
  }

  @deprecate(
    "Deprecated because of naming policy changes. " +
    "Use User.findByLogin instead."
  )
  static findOneByLogin(params) {
    return this.findByLogin(params)
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
  @toObject static async findByLogin(params) {
    const {args} = params

    const user = await this._findByLogin(params)

    invariant(
      !user, NotFound,
      "Can't find user with login %s.", String(args.login)
    )

    return user
  }

  @fromFields static _findById({args}) {
    return super.findById(args.id)
  }

  @toObject static async findById(params) {
    const user = await this._findById(params)

    invariant(!user, NotFound, "Can't find requested user.")

    return user
  }

  static findViewer(params) {
    return this.findById({...params, args: {id: params.ctx.state.user.id}})
  }

  comparePassword = async string => {
    if (!string) {
      return false
    }

    if (!this.password) {
      const user = await User.findById({args: {id: this._id}})

      return compare(string, user.password)
    }

    return compare(string, this.password)
  }

  updateLastVisit = () => this.update({"dates.lastVisit": new Date()}).exec()

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

    if (user.role != null) {
      user.role = this.__role.toUpperCase()
    }

    if (user.status != null) {
      user.status = this.__status.toUpperCase()
    }

    return user
  }
}

export default User
