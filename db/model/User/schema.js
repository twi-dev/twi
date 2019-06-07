"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

const {
  Schema
} = _mongoose.default;
const {
  Types: t
} = Schema;
/**
 * Get schema of this model
 *
 * @param {object} type
 * @param {object} virtuals
 *
 * @return {object}
 */

const user = ({
  roles,
  statuses
}) => new Schema({
  login: {
    type: t.String,
    unique: true,
    required: [true, "Login is required for user."],
    validate: {
      validator: val => /^[a-z0-9-_.]+$/i.test(val),
      message: "User login have unnesessary format: Allowed only " + "alphabetic characters, numbers and - _ . symbols."
    }
  },
  email: {
    // Private email address
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
    type: t.String,
    default: null
  },
  contacts: {
    type: {
      vk: t.String,
      fb: t.String,
      twitter: t.String,
      email: t.String,
      // Public email address
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
});

var _default = user;
exports.default = _default;
//# sourceMappingURL=schema.js.map