import {Model} from "sequelize"

import freeze from "js-flock/deepFreeze"

import createModel from "core/db/createModel"
import readOnly from "core/helper/decorator/readOnly"

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
}

export default User
