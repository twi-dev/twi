import mongoose from "mongoose"

const {Schema} = mongoose
const {Types: t} = Schema

const schema = new Schema({
  userId: {
    type: t.ObjectId,
    required: true,
    ref: "User"
  },
  client: {
    name: {
      type: t.String,
      required: true
    },
    os: {
      type: t.String,
      required: true
    },
    ip: {
      type: t.String,
      required: true
    }
  },
  dates: {
    firstLogin: {
      type: t.Date,
      required: true,
      default: Date.now,
    },
    lastLogin: {
      type: t.Date,
      required: true,
      default: Date.now,
      index: {
        expired: "1 year"
      }
    }
  },
  tokenUUID: {
    type: t.String,
    required: true,
    unique: true
  }
})

export default schema
