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
  client: {
    browser: {
      name: {
        type: t.String,
        required: true
      },
      version: {
        type: t.String,
        required: true
      }
    },
    os: {
      name: {
        type: t.String,
        required: true
      },
      version: {
        type: t.String,
        required: true
      }
    },
    ip: {
      type: t.String,
      required: true
    }
  },
  dates: {
    signedAt: {
      type: t.Date,
      required: true,
      default: Date.now,
    },
    updatedAt: {
      type: t.Date,
      required: true,
      default: Date.now,
      index: {
        expired: "1 year"
      }
    }
  }
})

export default schema
