import mongoose from "mongoose"

import updateDate from "db/common/hook/pre/updateDate"

const {Schema} = mongoose
const {Types: t} = Schema

const schema = new Schema({
  title: {
    type: t.String,
    required: true
  },
  content: {
    md: {
      type: t.ObjectId,
      required: true,
      ref: "File"
    },
    html: {
      type: t.ObjectId,
      ref: "File",
      sparse: true
    },
    text: {
      type: t.ObjectId,
      ref: "File",
      sparse: true
    }
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
  .pre("updateOne", updateDate)

export default schema
