import moment from "moment"
import {hash} from "bcryptjs"

import isPlainObject from "lodash/isPlainObject"

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

  static async createUser(user) {
    if (!isPlainObject(user)) {
      throw new TypeError("The data of new user should be provided as object")
    }

    const password = hash(user.password, 15)

    const role = User.roles.user

    return new this({
      ...user, password, role
    }).save()
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
