import mongoose from "mongoose"

import validateLogin from "./validateLogin"

const {Schema} = mongoose
const {Types: t} = Schema

/**
 * Get schema of this model
 *
 * @param {object} type
 * @param {object} virtuals
 *
 * @return {object}
 */
const user = ({roles, statuses}) => new Schema({
  login: {
    type: t.String,
    unique: true,
    required: [true, "Login is required for user."],
    validate: {
      validator: validateLogin,

      message: (
        "User login have unnesessary format: Allowed only " +
        "alphabetic characters, numbers and - _ . symbols."
      )
    }
  },
  email: { // Private email address
    type: t.String,
    unique: true,
    required: [true, "Required an email for user"]
  },
  password: {
    type: t.String,
    required: [true, "Password required for user"]
  },
  status: {
    type: t.Number,
    default: statuses.unactivated
  },
  role: {
    type: t.Number,
    default: roles.user
  },
  dates: {
    registeredAt: {
      type: t.Date,
      required: true,
      default: Date.now
    },
    updatedAt: {
      type: t.Date,
      default: null
    },
    lastVisit: {
      type: t.Date,
      default: null
    }
  },
  avatar: {
    type: t.ObjectId,
    req: "User",
    default: null
  },
  contacts: {
    type: {
      vk: t.String,
      fb: t.String,
      twitter: t.String,
      email: t.String, // Public email address
      telegram: t.String
    },
    default: {
      vk: null,
      fb: null,
      twitter: null,
      email: null,
      telegram: null
    }
  }
})

export default user
