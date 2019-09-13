import {hash, compare} from "bcrypt"
import {Model} from "sequelize"

import freeze from "js-flock/deepFreeze"

import createModel from "core/db/createModel"
import readOnly from "core/helper/decorator/readOnly"
import BadRequest from "core/error/http/BadRequest"

import schema from "./schema"

@createModel(schema, {createdAt: false})
class User extends Model {
  /**
   * User account status
   */
  @readOnly static statuses = freeze({
    inactive: "inactive",
    active: "active",
    suspended: "suspended",
    banned: "banned"
  })

  /**
   * Available user roles
   *
   * @return {object}
   */
  @readOnly static roles = freeze({
    super: "super",
    developer: "developer",
    admin: "admin",
    moderator: "moderator",
    support: "suppor",
    tech: "tech",
    user: "user",
  })

  /**
   * Find a user by given login
   *
   * @param {string} login
   * @param {object} options
   *
   * @return {Promise<User>}
   */
  static findByLogin(login, options) {
    return this.findOne({...options, where: {login}})
  }

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
   * @param {string} string – a string to compare password with
   *
   * @return {boolean} – "true" when given string equals user's password
   */
  comparePassword = async string => compare(string, this.password)

  updateAvatar(avatarId, options) {
    return this.setAvatar(avatarId, options)
  }

  removeAvatar(options) {
    return this.setAvatar(null, options)
  }

  updateEmail(email, options) {
    return this.update({email}, options)
  }

  async updatePassword(oldPassword, newPassword, options) {
    if (await this.comparePassword(oldPassword) === false) {
      throw new BadRequest("Current password is incorrect.")
    }

    return hash(newPassword, 15)
      .then(password => this.update({password}, options))
  }
}

export default User
