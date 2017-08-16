import moment from "moment"

const getModelFields = ({TString, /* TNumber, */ TDate}) => ({
  title: {
    type: TString,
    required: true
  },
  // number: {
  //   type: TNumber,
  //   required: true
  // },
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
  createdAt: {
    type: TDate,
    default: moment
  },
  updatedAt: {
    type: TDate,
    default: moment
  }
})

export default getModelFields
