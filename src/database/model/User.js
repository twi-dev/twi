import {hash} from "bcryptjs"
import invariant from "@octetstream/invariant"

import {createModel, Model} from "core/database"

import findKey from "core/helper/iterator/sync/objFindKey"

@createModel
class User extends Model {
  /**
   * Create a new regular user.
   *
   * @param TUserInput user
   *
   * @return TUser
   */
  static async createOne(user) {
    const password = await hash(user.password, 15)

    const role = User.roles.user

    return await super.createOne({...user, password, role})
  }

  static async createMany() {
    invariant(
      true,
      "This method is not allowed in this class. Use %s.createOne instead.",
      User.name
    )
  }

  static async getByLogin(login) {
    login = new RegExp(`^${login}$`, "i")

    const user = await this.findOne().where({login}).exec()

    return await user.toJS()
  }

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
   * @return object
   */
  static get roles() {
    return {
      su: 0,
      admin: 1,
      mod: 2,
      user: 3,
    }
  }

  get __role() {
    const role = findKey(User.roles, code => code === this.role)

    return role
  }

  get __status() {
    const role = findKey(User.statuses, code => code === this.status)

    return role
  }

  get isBanned() {
    return this.status === User.statuses.banned
  }

  get isSuspended() {
    return this.status === User.statuses.suspended
  }

  get isActivated() {
    return this.status === User.statuses.activated
  }

  get isUnactivated() {
    return this.status === User.statuses.unactivated
  }

  get isUser() {
    return this.role === User.roles.user
  }

  get isMod() {
    return this.role === User.roles.mod
  }

  get isAdmin() {
    return this.role === User.roles.admin
  }

  get isSu() {
    return this.role === User.roles.su
  }

  async toJS(options) {
    const user = await super.toJS(options)

    const role = this.__role
    const status = this.__status

    return {
      ...user, role, status
    }
  }
}

export default User
