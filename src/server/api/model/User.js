import moment from "moment"
import {hash} from "bcryptjs"

import {createModel, Model} from "server/api/core/database/model"

class User extends Model {
  /**
   * Get schema of this model
   *
   * @param object type
   *
   * @return object
   *
   * @static
   */
  static getModelFields = ({TString, TNumber, TDate}) => ({
    login: {
      type: TString,
      unique: true,
      required: [true, "Login is required for user."],
      validate: {
        validator: val => /^[a-z0-9-_.]+$/i.test(val),
        message: (
          "User login have unnesessary format: Allowed only " +
          "alphabetic characters, numbers and - _ . symbols."
        )
      }
    },
    email: {
      type: TString,
      unique: true,
      required: [true, "Required an email for user"]
    },
    password: {
      type: TString,
      required: [true, "Password required for user"]
    },
    status: {
      type: TNumber,
      default: User.statuses.unactivated
    },
    role: {
      type: TNumber,
      default: User.roles.regular
    },
    registeredAt: {
      type: TDate,
      default: moment
    },
    avatar: {
      type: TString,
      default: null
    },
    contacts: {
      type: {
        vk: TString,
        fb: TString,
        twitter: TString
      },
      default: {
        vk: null,
        fb: null,
        twitter: null
      }
    }
  })

  /**
   * Create a new regular user.
   *
   * @param TUserInput user
   *
   * @return TUser
   */
  static async create(user) {
    // Weird thing, I know that. Just for more readable code :)
    const Model = this

    const password = await hash(user.password, 15)

    const model = new Model({...user, password})

    const createdUser = await model.save()

    // Also, we have to sent an email to given address before return user
    return createdUser
  }

  static async getByLogin(login) {
    const Model = this

    const user = await Model.findOne({login})

    return user
  }

  static statuses() {
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
      owner: 0,
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

  toJS(...args) {
    const user = super.toJS(...args)

    const role = this.roleInfo

    const id = this.id

    return {
      ...user, role, id
    }
  }
}

export default createModel(User)
