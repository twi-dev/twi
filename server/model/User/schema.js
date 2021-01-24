import {DataTypes as t} from "sequelize"

import BadRequest from "lib/error/http/BadRequest"

import isCorrect from "./util/validateLogin"
import isReserved from "./util/isReserved"
import statuses from "./statuses.json"
import roles from "./roles.json"

const {values} = Object

const schema = {
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
          throw new BadRequest("Incorrect login format.")
        }
      },

      isReserved(value) {
        if (isReserved(value)) {
          throw new BadRequest("Cannot use reserved word as a user's login.")
        }
      }
    }
  },
  password: {
    type: t.STRING,
    allowNull: false
  },
  status: {
    type: t.ENUM(values(statuses)),
    defaultValue: statuses.inactive,
    allowNull: false
  },
  role: {
    type: t.ENUM(values(roles)),
    defaultValue: roles.user,
    allowNull: false
  }
}

export default schema
