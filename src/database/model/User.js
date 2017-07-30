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
    const role = this.role

    const [name, code] = Object
      .entries(User.roles)
      .find(entry => role === entry[1])

    return {name, code}
  }

  get statusInfo() {
    const status = this.status

    const [name, code] = Object
      .entries(User.statuses)
      .find(entry => status === entry[1])

    return {name, code}
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
