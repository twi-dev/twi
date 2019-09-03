import {DataTypes as t} from "sequelize"

import isCorrect from "./util/validateLogin"
import isReserved from "./util/isReserved"

const {values} = Object

const schema = User => ({
  contactsId: {
    type: t.INTEGER,
    field: "contacts_id"
  },
  avatarId: {
    type: t.INTEGER,
    field: "avatar_id"
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
    defaultValue: t.NOW,
    field: "registered_at"
  },
  lastVisited: {
    type: t.DATE,
    allowNull: false,
    defaultValue: t.NOW,
    field: "last_visited"
  }
})

export default schema
