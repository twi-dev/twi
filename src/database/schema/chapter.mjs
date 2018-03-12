import now from "core/helper/util/now"

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
      default: now
    },
    updatedAt: {
      type: TDate,
      default: now
    }
  }
})

export default chapter
