import mongoose from "mongoose"

const {Schema} = mongoose
const {Types: t} = Schema

const schema = new Schema({
  hash: {
    type: t.String,
    required: true,
    unique: true
  },
  userId: {
    type: t.ObjectId,
    required: true,
    ref: "User"
  },
  createdAt: {
    type: t.Date,
    required: true,
    default: Date.now,
    index: {
      expires: "1 day"
    }
  }
})

export default schema
