import moment from "moment"

const chapter = ({TString, TDate}) => ({
  title: {
    type: TString,
    required: true
  },

  // TODO: Move contents storage to a file on external static server.
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

export default chapter
