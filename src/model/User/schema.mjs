import {DataTypes as t} from "sequelize"

import isCorrect from "./util/validateLogin"
import isReserved from "./util/isReserved"

const {values} = Object

const schema = User => ({
  id: {
    type: t.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true
  },
  avatarId: t.INTEGER.UNSIGNED,
  email: {
    type: t.STRING,
    unique: true,
    allowNull: false,
    comment: "User's PRIVATE email address.",
    validate: {
      isEmail: true
    }
  },
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
        if (isReserved(value)) {
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
    defaultValue: User.statuses.inactive,
    allowNull: false
  },
  role: {
    type: t.ENUM(values(User.roles)),
    defaultValue: User.roles.user,
    allowNull: false
  },
  registeredAt: {
    type: t.DATE,
    allowNull: false,
    defaultValue: t.NOW
  },
  lastVisited: {
    type: t.DATE,
    allowNull: false,
    defaultValue: t.NOW
  }
})

export default schema
