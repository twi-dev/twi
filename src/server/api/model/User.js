import moment from "moment"
import {hash} from "bcryptjs"

// import isPlainObject from "lodash/isPlainObject"

import createModel from "server/api/core/base/model"

class User {
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
      required: [true, "Login is required for each user."],
      validate: {
        validator: val => /^[a-z0-9-_.]+$/i.test(val),
        message: (
          "User login have unnesessary format: Addlowed only " +
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
      required: true
    },
    role: {
      type: TNumber,
      default: 0 // Default role is "user"
    },
    registeredAt: {
      type: TDate,
      default: moment
    },
    avatar: TString,
    contacts: {
      vk: TString,
      fb: TString,
      twitter: TString
    }
  })

  // static async getUserByLogin(_, {login}) {
  //   const user = await this.findOne({login})

  //   return user.toObject()
  // }

  static async createUser(_, user) {
    // Weird thing, I know that. Just for more readable code :)
    const Model = this

    const password = hash(user.password, 15)

    const role = User.roles.user

    const model = new Model({...user, password, role})
    const createdUser = await model.save()

    // Also, we have to sent an email to given address before return user
    return createdUser.toObject()
  }

  static roles = {
    user: 0,
    banned: 1,
    suspended: 2,
    moderator: 3,
    admin: 4,
    owner: 5
  }
}

export default createModel(User)
