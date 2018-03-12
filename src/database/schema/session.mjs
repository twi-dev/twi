import now from "core/helper/util/now"

const session = ({TString, TDate, TObjectId}) => ({
  userId: {
    type: TObjectId,
    required: true,
    ref: "User"
  },
  client: {
    name: {
      type: TString,
      required: true
    },
    os: {
      type: TString,
      required: true
    },
    ip: {
      type: TString,
      required: true
    }
  },
  dates: {
    firstLogin: {
      type: TDate,
      default: now
    },
    lastLogin: {
      type: TDate,
      default: now
    }
  },
  tokenUUID: {
    type: TString,
    required: true,
    unique: true
  }
})

export default session
