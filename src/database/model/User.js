import {hash} from "bcryptjs"

import {createModel, Model} from "core/database"

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

    user = await this({...user, password}).save()

    return await user.toJS()
  }

  static async getByLogin(username) {
    username = new RegExp(`^${username}$`, "i")

    const user = await this.findOne({
      $or: [
        {
          login: username
        },
        {
          email: username
        }
      ]
    })

    return user
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
      moderator: 2,
      regular: 3,
    }
  }

  get roleInfo() {
    const [name, code] = Object
      .entries(User.roles)
      .find(entry => this.role === entry[1])

    return {name, code}
  }

  get statusInfo() {
    const [name, code] = Object
      .entries(User.statuses)
      .find(entry => this.status === entry[1])

    return {name, code}
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
    return this.role === User.roles.regular
  }

  get isModerator() {
    return this.role === User.roles.moderator
  }

  get isAdmin() {
    return this.role === User.roles.admin
  }

  get isSu() {
    return this.role === User.roles.su
  }

  async toJS(...args) {
    const user = await super.toJS(...args)

    const role = this.roleInfo

    return {
      ...user, role
    }
  }
}

export default User
