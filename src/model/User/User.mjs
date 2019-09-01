import {Model, DataTypes as t} from "sequelize"

import freeze from "js-flock/deepFreeze"

import readOnly from "core/helper/decorator/readOnly"

import File from "model/File"
import Contacts from "model/Contacts"

import isCorrect from "./util/validateLogin"
import isReserved from "./util/isReserved"

const values = Object.values

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

// User's dchema definition
User.init({
  id: {
    type: t.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  avatarId: {
    type: t.INTEGER,
    unique: true,
    allowNull: false,
    field: "avatar_id",
    comment: "User's avatar referenced from an image File.",
    references: {
      model: File,
      key: "id"
    }
  },
  contactsId: {
    type: t.INTEGER,
    unique: true,
    allowNull: false,
    field: "contacts_id",
    comment: "User's contacts set.",
    references: {
      model: Contacts,
      key: "id"
    }
  },
  email: {
    type: t.STRING,
    unique: true,
    allowNull: false,
    comment: "User's PRIVATE email address.",
    validate: {
      isEmail: true
    }
  },
  // TODO: Add login validation
  login: {
    type: t.STRING,
    unique: true,
    allowNull: false,
    validate: {
      isCorrect(value) {
        if (!isCorrect(value)) {
          throw new Error("Incorrect login format.")
        }
      },

      isReserved(value) {
        if (!isReserved(value)) {
          throw new Error("Cannot use reserved word as a user's login.")
        }
      }
    }
  },
  password: {
    type: t.STRING,
    allowNull: false
  },
  status: {
    type: t.ENUM(values(User.statuses)),
    default: User.statuses.inactive,
    allowNull: false
  },
  role: {
    type: t.ENUM(values(User.roles)),
    default: User.roles.user,
    allowNull: false
  },
  registeredAt: {
    type: t.DATE,
    allowNull: false,
    default: t.NOW,
    field: "registered_at"
  },
  updatedAt: {
    type: t.DATE,
    default: null,
    field: "updated_at"
  },
  lastVisited: {
    type: t.DATE,
    allowNull: false,
    default: t.NOW,
    field: "last_visited"
  }
})

// Associations
User.hasOne(File)
File.belongsTo(User)

User.hasOne(Contacts)
Contacts.belongsTo(User)

export default User
