import mongoose from "mongoose"

const {Schema} = mongoose
const {Types: t} = Schema

const schema = new Schema({
  title: {
    type: t.String,
    required: true
  },

  // TODO: Move contents storage to a file on external static server.
  content: {
    original: {
      type: t.String,
      required: true
    },
    rendered: {
      type: t.String,
      required: true
    }
  },
  dates: {
    createdAt: {
      type: t.Date,
      default: Date.now
    },
    updatedAt: {
      type: t.Date,
      default: Date.now
    }
  }
})

export default schema
