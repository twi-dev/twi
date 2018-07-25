import now from "core/helper/util/now"

/**
 * Get schema of this model
 *
 * @param {object} type
 * @param {object} virtuals
 *
 * @return {object}
 */
const user = ({TString, TNumber, TDate}, {roles, statuses}) => ({
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
  email: { // Private email address
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
    default: statuses.unactivated
  },
  role: {
    type: TNumber,
    default: roles.user
  },
  dates: {
    registeredAt: {
      type: TDate,
      default: now
    },
    lastVisit: {
      type: TDate,
      default: null
    }
  },
  avatar: {
    type: TString,
    default: null
  },
  contacts: {
    type: {
      vk: TString,
      fb: TString,
      twitter: TString,
      email: TString, // Public email address
      telegram: TString
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
