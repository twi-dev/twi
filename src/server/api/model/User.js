import moment from "moment"
import {hash} from "bcryptjs"

import {createModel, Model} from "server/api/core/base/model"

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

  static async createUser(user) {
    // Weird thing, I know that. Just for more readable code :)
    const Model = this

    const password = await hash(user.password, 15)

    const role = User.roles.regular

    const model = new Model({...user, password, role})

    const createdUser = await model.save()

    // Also, we have to sent an email to given address before return user
    return createdUser
  }

  /**
   * Available user roles
   *
   * @return object
   */
  static get roles() {
    return {
      regular: 0,
      banned: 1,
      suspended: 2,
      moderator: 3,
      admin: 4,
      owner: 5
    }
  }

  get userId() {
    return this.id || this._id
  }

  get roleInfo() {
    const role = this.role

    const [name, code] = Object
      .entries(User.roles)
      .find(entry => role === entry[1])

    return {name, code}
  }

  toJS(...args) {
    const user = super.toJS(...args)

    console.log(user)

    const role = this.roleInfo

    const userId = this.userId

    return {
      ...user, role, userId
    }
  }
}

export default createModel(User)
