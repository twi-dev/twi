import {join} from "path"

import {hash, compare} from "bcryptjs"
import {copyFile, unlink} from "promise-fs"

import partial from "lodash/partial"
import nanoid from "nanoid/async"

import {createModel, Model} from "core/db"

import mkdirp from "core/helper/util/mkdirp"
import serial from "core/helper/array/runSerial"

import schema from "./schema"

const AVATAR_SAVE_ROOT = join(
  __dirname, "..", "..", "static", "assets", "files", "avatars"
)

@createModel(schema)
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
  static findByLogin(login) {
    return this.findOne({login: new RegExp(`^${login}$`, "i")})
  }

  /**
   * Updates viewer's avatar
   */
  // Rewrite this from scratch
  async updateAvatar(file) {
    const {path, extname} = file

    const dir = join(AVATAR_SAVE_ROOT, this.id)
    const dest = join(dir, await nanoid(), extname)

    await serial([partial(mkdirp, [dir]), partial(copyFile, [path, dest])])

    return User.findById(this.id)
  }

  /**
   * Removes viewer's avatar
   */
  async removeAvatar() {
    try {
      await unlink(this.avatar)
    } catch (err) {
      if (err.code !== "ENOENT") {
        throw err
      }
    }

    return this.findById(this.id)
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
      user.role = this.roleName.toUpperCase()
    }

    if (user.status != null) {
      user.status = this.statusName.toUpperCase()
    }

    return user
  }
}

export default User
