import moment from "moment"

const getModelFields = ({TString, TDate}) => ({
  title: {
    type: TString,
    required: true
  },
  content: {
    original: {
      type: TString,
      required: true
    },
    rendered: {
      type: TString,
      required: true
    }
  },
  dates: {
    createdAt: {
      type: TDate,
      default: moment
    },
    updatedAt: {
      type: TDate,
      default: moment
    }
  }
})

export default getModelFields
