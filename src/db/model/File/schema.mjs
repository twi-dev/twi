import mongoose from "mongoose"

const {Schema} = mongoose
const {Types: t} = Schema

const schema = new Schema({
  creator: {
    type: t.ObjectId,
    required: true,
    ref: "User"
  },
  path: {
    type: t.String,
    requred: true,
    unique: true
  },
  hash: {
    type: t.String,
    required: true,
    unique: true
  },
  mime: {
    type: t.String,
    required: true
  },
  size: {
    type: t.Number,
    required: true
  },
  dates: {
    createdAt: {
      type: t.Date,
      required: true,
      default: Date.now
    },
    updatedAt: {
      type: t.Date,
      default: null
    }
  }
})

export default schema
