import moment from "moment"

const getModelFields = ({TString, TDate, TObjectId}) => ({
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
      default: moment
    },
    lastLogin: {
      type: TDate,
      default: moment
    }
  },
  tokenUUID: {
    type: TString,
    required: true,
    unique: true
  }
})

export default getModelFields
